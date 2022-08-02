import React from 'react';
import { View, Text} from 'react-native';


export default class ChatScreen extends React.Component {

    componentDidMount(){
        let {name} = this.props.route.params; 
        // display user name
        this.props.navigation.setOptions({ title: name });
    }


    render() {

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
                <Text>chat will take place here</Text>
            </View>
        )
    }
}