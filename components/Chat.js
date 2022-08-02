import React from 'react';
import { View, Text} from 'react-native';


export default class ChatScreen extends React.Component {

    componentDidMount(){
        let {name} = this.props.route.params; 
        this.props.navigation.setOptions({ title: name });
    }


    render() {

        //const { colorOption } = this.props.route.params;

        return (
            <View 
                style={{
                    flex:1, 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    backgroundColor: this.props.route.params.color
                        ? this.props.route.params.color 
                        : '#bbbbbb' 
                }}>
                <Text>chat will take place here</Text>
            </View>
        )
    }
}