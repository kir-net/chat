import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { connectActionSheet } from '@expo/react-native-action-sheet';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import firebase from 'firebase';
import 'firebase/firestore';

class CustomAction extends React.Component {
    // Upload images to firebase
    uploadImageFetch = async (uri) => {
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {resolve(xhr.response)};
            xhr.onerror = function (e) {
                console.log(e);
                reject(new TypeError('Network request failed'));
            };
            xhr.responseType = 'blob';
            xhr.open('GET', uri, true);
            xhr.send(null);
        });

        const imageNameBefore = uri.split('/');
        const imageName = imageNameBefore[imageNameBefore.length - 1];

        // refernece to the storage
        const ref = firebase.storage().ref().child(`images/${imageName}`);

        const snapshot = await ref.put(blob);

        // close the connection
        blob.close();

        return await snapshot.ref.getDownloadURL();
    };

    // select image from library
    pickImage = async () => {
        // Ask for permission
        const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
        try {if (status === 'granted') {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: 'Images',
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            }).catch((error) => {Alert(error.message)});
            if (!result.cancelled) {
                const imageUrl = await this.uploadImageFetch(result.uri);
                this.props.onSend({ image: imageUrl });
            }
        }} catch (error) {Alert(error.message)}
    };

    takePhoto = async () => {
        // Ask for permission
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        try {if (status === 'granted') {
            let result = await ImagePicker.launchCameraAsync({
                mediaTypes: 'Images',
            }).catch((error) => {Alert(error.message)});
            if (!result.cancelled) {
                const imageUrl = await this.uploadImageFetch(result.uri);
                this.props.onSend({ image: imageUrl });
            }
        }} catch (error) {Alert(error.message)}
    };

    getLocation = async () => {
        // Ask for permission
        const { status } = await Location.requestForegroundPermissionsAsync();
        try {if (status === 'granted') {
            let result = await Location.getCurrentPositionAsync({});
            if (result) {
                this.props.onSend({
                    location: {
                        longitude: result.coords.longitude,
                        latitude: result.coords.latitude,
                    },
                });
            }
        }} catch (error) {Alert(error.message)}
    };

    // Actionsheet
    onActionPress = () => {
        // Same interface as https://facebook.github.io/react-native/docs/actionsheetios.html
        const options = [
            'Choose From Library',
            'Take Picture',
            'Send Location',
            'Cancel',
        ];
        const cancelButtonIndex = options.length - 1;

        this.props.showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex,
            },
            async (buttonIndex) => {
                switch (buttonIndex) {
                case 0: return this.pickImage();
                case 1: return this.takePhoto();
                case 2: return this.getLocation();
                }
            }
        );
    };

    render() {
        return (
          <TouchableOpacity style={[styles.container]} onPress={this.onActionPress}>
            <View style={[styles.wrapper, this.props.wrapperStyle]}>
              <Text style={[styles.iconText, this.props.iconTextStyle]}>+</Text>
            </View>
          </TouchableOpacity>
        );
      }
}

const styles = StyleSheet.create({
    container: {
        width: 26,
        height: 26,
        marginLeft: 10,
        marginBottom: 10,
    },
    wrapper: {
        borderRadius: 13,
        borderColor: '#b2b2b2',
        borderWidth: 2,
        flex: 1,
    },
    iconText: {
        color: '#b2b2b2',
        fontWeight: 'bold',
        fontSize: 16,
        backgroundColor: 'transparent',
        textAlign: 'center',
    },
});

CustomAction.contextTypes = {actionSheet: PropTypes.func};

const CustomActions = connectActionSheet(CustomAction);

export default CustomActions;