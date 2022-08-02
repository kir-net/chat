import React from 'react';
import { View, Text, Platform, KeyboardAvoidingView} from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

export default class ChatScreen extends React.Component {

 
    constructor() {
        super();
        this.state = {
            messages: [],
        }
    }
        

    componentDidMount(){
        this.setState({
            messages: [{
                _id: 1,
                text: `Hello ${this.props.route.params.name}`,
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            }],
        })
    }

    onSend(messages = []) {
        this.setState((previousState) => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }));
    }

    renderBubble(props) {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    left: {
                        backgroundColor: 'lightcyan',
                        paddingHorizontal: '8px',
                        paddingVertical: '1px',
                        
                    },
                    right: {
                        backgroundColor: 'darkcyan',
                        backgroundColor: '#4682B4',

                        paddingHorizontal: '8px',
                        paddingVertical: '1px',
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