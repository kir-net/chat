import React, { Component } from 'react';
import 'react-native-gesture-handler';

// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// import the screens
import HomeScreen from './components/Start';
import ChatScreen from './components/Chat';

// Create the navigator
const Stack = createStackNavigator();

export default class App extends Component {

    render() {
        return (
            // enable navigation
            <NavigationContainer>
                <Stack.Navigator initialRouteName="HomeScreen">
                
                    {/* START SCREEN */}
                    <Stack.Screen
                        name="HomeScreen"
                        component={HomeScreen}
                    />

                    {/* CHAT SCREEN */}
                    <Stack.Screen
                        name="ChatScreen"
                        component={ChatScreen}
                    />

                </Stack.Navigator>
            </NavigationContainer>
        );
    }
  
}