import React, {Component} from 'react';
import { View, KeyboardAvoidingView, Platform } from 'react-native';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import firebase from 'firebase';
import 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

export default class Chat extends Component {

    // -------------------------------------------
    //    constructor
    // -------------------------------------------    
    constructor() {
        super();
        this.state = {
            messages: [],
            uid: 0,
            user: {
                _id: '',
                name: '',
            },
        }   
        // Firebase configuration
        const firebaseConfig = {
            apiKey: "AIzaSyDh5MDsTsnz7e8Xy6llkc3kBtMwrydLn8M",
            authDomain: "chatapp-567ae.firebaseapp.com",
            projectId: "chatapp-567ae",
            storageBucket: "chatapp-567ae.appspot.com",
            messagingSenderId: "272129669586",
            appId: "1:272129669586:web:b3d1bfd764d34ab904700b"
        };   
        //  Initialize database with config-data
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }   
        // reference the database
        this.referenceChatMessages = firebase.firestore().collection('messages');
    }


    // -------------------------------------------
    //    onCollectionUpdate
    // -------------------------------------------
    onCollectionUpdate = (querySnapshot) => {
        const messages = [];
        // Go through each document
        querySnapshot.forEach((doc) => {
            // Get the QueryDocumentsSnapshot's data
            let data = doc.data();
            messages.push({
                _id: data._id,
                text: data.text || '',
                createdAt: data.createdAt.toDate(),
                user: {
                    _id: data.user._id,
                    name: data.user.name,
                },
            });
        });
        this.setState({messages});
    };


    // -------------------------------------------
    //    asyncStorage
    // -------------------------------------------
    // get messages from asyncStorage
    async getMessages() {
        let messages = '';
        try { messages = await AsyncStorage.getItem('messages') || [];
            this.setState({messages: JSON.parse(messages)});
        } catch (error) {console.log(error.message)}
    };

    // save messages in asyncStorage
    async saveMessages() {
        try { await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
        } catch (error) {console.log(error.message)}
    };

    // delete messages in asyncStorage
    async deleteMessages() {
        try { await AsyncStorage.removeItem('messages');
            this.setState({messages: []})
        } catch (error) {console.log(error.message)}
    };


    // -------------------------------------------
    //    componentDidMount()
    // -------------------------------------------
    componentDidMount() {
        // Set name as title chat
        let { name } = this.props.route.params;
        this.props.navigation.setOptions({ title: name });
        

        // Check if user is offline or online
        NetInfo.fetch().then(connection => {
            if (connection.isConnected) {
                this.setState({isConnected: true});
                    // Reference to load messages from Firebase
                this.referenceChatMessages = firebase
                    .firestore()
                    .collection('messages');

                // Authenticate user anonymously
                this.authUnsubscribe = firebase
                    .auth()
                    .onAuthStateChanged(async (user) => {
                        if (!user) {firebase.auth().signInAnonymously() }
                        this.setState({
                            uid: user.uid,
                            messages: [{
                                _id: 1,
                                text: `Hello ${this.props.route.params.name}`,
                                createdAt: new Date(),
                            }],
                            user: {
                                _id: user.uid,
                                name: name,
                            },
                        });
                        this.unsubscribe = this.referenceChatMessages
                            .orderBy('createdAt', 'desc')
                            .onSnapshot(this.onCollectionUpdate);
                    });
            } else {
                this.setState({isConnected: false});
                this.getMessages();
            }
        });
    }

    // -------------------------------------------
    //    componentWillUnmount()
    // -------------------------------------------
    componentWillUnmount() {
        if (this.isConnected) {
            this.unsubscribe();
            this.authUnsubscribe();
        }
    }


    // -------------------------------------------
    //    custom functions
    // -------------------------------------------

    // Adds messages to cloud storage
    addMessages() {
        const message = this.state.messages[0];
        this.referenceChatMessages.add({
            uid: this.state.uid,
            _id: message._id,
            text: message.text || "",
            createdAt: message.createdAt,
            user: message.user,       
        });
    }
  
    onSend(messages = []) {
        this.setState((previousState) => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }),() => {
            this.addMessages();
            this.saveMessages();
        });
    }



    // -------------------------------------------
    //    rendering
    // -------------------------------------------   
    // Don't render input bar if offline
    renderInputToolbar(props) {
            if (this.state.isConnected == false) {
                console.log('is offline');

        } else {
            console.log('is online');
            return <InputToolbar {...props} />}
    }

    // style message bubbles
    renderBubble(props) {
        return (<Bubble {...props}
            wrapperStyle={{
                left: { 
                    backgroundColor: 'lightcyan',                   
                    paddingHorizontal: 8,
                    paddingVertical: 1,                        
                },
                right: { 
                    backgroundColor: '#4682B4',                   
                    paddingHorizontal: 8,
                    paddingVertical: 1,
                },
            }}
        />)
    }

    // render main
    render() {
        return (<View 
            style={{
                flex:1,               
                // set background color as chosen by user
                backgroundColor: this.props.route.params.color
                    ? this.props.route.params.color 
                    : '#bbbbbb' 
            }}>          
            <GiftedChat
                renderBubble={this.renderBubble.bind(this)} 
                renderInputToolbar={this.renderInputToolbar.bind(this)}          
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
        </View>)
    }
}