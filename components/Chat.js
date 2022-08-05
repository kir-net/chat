import React, { Component } from 'react';
import { View, Platform, KeyboardAvoidingView} from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

// import firestore
const firebase = require('firebase');
require('firebase/firestore');

export default class ChatScreen extends Component {

    constructor() {
        super();
        this.state = {
            messages: [],
            uid: 0,
            user: {
                _id: "",
                name: "",
                avatar: "",
            },
        };

        // the chat web app's Firebase configuration
        const firebaseConfig = {
            apiKey: "AIzaSyDh5MDsTsnz7e8Xy6llkc3kBtMwrydLn8M",
            authDomain: "chatapp-567ae.firebaseapp.com",
            projectId: "chatapp-567ae",
            storageBucket: "chatapp-567ae.appspot.com",
            messagingSenderId: "272129669586",
            appId: "1:272129669586:web:b3d1bfd764d34ab904700b"
        };

        // initialize Firebase
        firebase.initializeApp(firebaseConfig);

        // reference to the Firestore message collection
        this.referenceChatMessages = firebase.firestore().collection("messages");
    };

    componentDidMount() {

        let name = this.props.route.params.name;
        this.props.navigation.setOptions({ title: name });
        this.referenceChatMessages = firebase.firestore().collection("messages");
        this.unsubscribe = this.referenceChatMessages.onSnapshot(this.onCollectionUpdate);

        this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
            if (!user) {
                await firebase.auth().signInAnonymously();
            }
            this.setState({
                uid: user.uid,
                messages: [],
                user: {
                    _id: user.uid,
                    name: name,
                    avatar: "https://placeimg.com/140/140/any",
                },
            });
            // listens for updates in the collection
            this.unsubscribe = this.referenceChatMessages
                .orderBy("createdAt", "desc")
                .onSnapshot(this.onCollectionUpdate);
            // create a reference to the active user's documents (shopping lists)
            this.referenceChatMessages = firebase
                .firestore()
                .collection('messages')
                .where("uid", "==", this.state.uid);
        });
    }


    componentWillUnmount() {
        this.unsubscribe();
        this.authUnsubscribe();
    }

    onSend(messages = []) {this.setState(
        (previousState) => (
            {messages: GiftedChat.append(previousState.messages, messages)}
        ), 
        () => {this.addMessages()}
    )};

    // retrieve current data from database
    onCollectionUpdate = (querySnapshot) => {
        const messages = [];
        // go through each document
        querySnapshot.forEach((doc) => {
            // get the QueryDocumentSnapshot's data
            let data = doc.data();
            messages.push({
                _id: data._id,
                text: data.text,
                createdAt: data.createdAt.toDate(),
                user: {
                    _id: data.user._id,
                    name: data.user.name,
                    avatar: data.user.avatar
                }
            });
        });
        this.setState({
            messages,
        });
    };

    addMessages() {
        const message = this.state.messages[0];
        this.referenceChatMessages.add({
            _id: message._id,
            text: message.text || "",
            createdAt: message.createdAt,
            user: this.state.user,
        });
    };

    renderBubble(props) {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    left: {
                        backgroundColor: 'lightcyan',
                        paddingHorizontal: '8',
                        paddingVertical: '1',
                        
                    },
                    right: {
                        backgroundColor: 'darkcyan',
                        backgroundColor: '#4682B4',

                        paddingHorizontal: '8',
                        paddingVertical: '1',
                    },
                }}
            />
        )
    }


    render() {
        let name = this.props.route.params.name; 
        //display user name
        this.props.navigation.setOptions({ title: name });
        return (        
            <View 
                style={{
                    flex:1, 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    // set background color as chosen by user
                    backgroundColor: this.props.route.params.color
                        ? this.props.route.params.color 
                        : '#bbbbbb' 
                }}>
                
                <GiftedChat
                    renderBubble={this.renderBubble.bind(this)}              
                    messages = {this.state.messages}
                    
                    onSend = {(messages) => this.onSend(messages)}
                    user={{
                        _id: 1,
                    }}
                />
                { Platform.OS === 'android' 
                    ? <KeyboardAvoidingView behavior="height" /> 
                    : null
                }
            </View>
        )
    }
}