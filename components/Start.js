import React, { Component } from 'react';
import { View, Text, TextInput, Pressable,
    Button, ImageBackground, StyleSheet } from 'react-native';

const BackgroundImage = require('../assets/featherlight.png');

export default class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            name: '',
            color: '' 
        };
    }

    // definitions of background color options
    colors = { 
        option1: "#090c08",
        option2: "#474056",
        option3: "#8a95a5",
        option4: "#b9c6ae",
    };

    // save background color option clicked by user
    setColor = (clickedColor) => {
        this.setState({ color: clickedColor });
    };
       
    render() {        
        return (
            <View style={styles.container}>

                <ImageBackground 
                    style={styles.image} 
                    source={BackgroundImage} 
                    resizeMode="cover"                   
                >
                    <Text style={styles.title}> CozyChat </Text>
                    <View style={styles.box}>

                        {/* Input for user name */}
                        <TextInput
                            style={styles.textInput}                    
                            onChangeText={(name) => this.setState({ name })}
                            value={this.state.name}
                            placeholder='Type your name:'
                        />

                        {/* Show background color options */}
                        <Text style={styles.text}>Choose background color:</Text>

                        <View style={styles.colorContainer}>
                            <Pressable
                                style={[
                                    styles.colorOption1, 
                                    styles.colorbutton
                                ]}
                                onPress={() => this.setColor(this.colors.option1)}
                            />
                            <Pressable
                                style={[ 
                                    styles.colorOption2, 
                                    styles.colorbutton
                                ]}
                                onPress={() => this.setColor(this.colors.option2)}

                            />
                            <Pressable
                                style={[ 
                                    styles.colorOption3, 
                                    styles.colorbutton
                                ]}
                                onPress={() => this.setColor(this.colors.option3)}

                            />
                            <Pressable
                                style={[
                                    styles.colorOption4, 
                                    styles.colorbutton
                                ]}
                                onPress={() => this.setColor(this.colors.option4)}

                            />
                        </View>                        

                        {/* Button -> navigate to chat screen */}
                        <Button
                            fontColor='#ffffff'
                            color='#757083'                          
                            title="start"                   
                            onPress={() =>  this.props.navigation.navigate(
                                'ChatScreen', {
                                    name:  this.state.name,
                                    color: this.state.color
                                }
                            )}
                        />
                    </View>
                </ImageBackground>               
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },

    box: {
        backgroundColor: 'rgba(230,240,255,0.85)',
        paddingHorizontal: 40,
        paddingTop: 25,
        paddingBottom: 40,
        borderColor: 'midnightblue',
        borderWidth: 1,
        alignItems: 'center',
    },
    
    title: {
        fontSize: 45,
        fontWeight: '600',
        backgroundColor: '#757083',
        opacity: '70%',
        color: '#FFFFFF',
        padding: 15,
        borderRadius: '100%',          
        marginBottom: 155,
    },

    image: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },

    text: {
        fontSize: 16,
        fontWeight: '300',
        color: '#757083',
        opacity: '100%',
    },

    colorContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    colorbutton: {
        width: 40,
        height: 40,
        borderRadius: 20,    
        marginTop: 5,
        marginBottom: 35,
        borderColor: 'gray', 
        borderWidth: 1,
    },

    colorOption1: {
        backgroundColor: '#090C08'
    },
    colorOption2: {
        backgroundColor: '#474056'
    },
    colorOption3: {
        backgroundColor: '#8A95A5'
    },
    colorOption4: {
        backgroundColor: '#B9C6AE'
    },

    textInput: {
        fontSize: 16,
        fontWeight: '300',
        fontColor: '#757083',
        opacity: 0.5,
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 1,
        padding: 3,
        marginBottom: 25,
        backgroundColor: 'white'
    },
    
})