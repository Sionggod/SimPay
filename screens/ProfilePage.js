import React, { Component } from 'react';
import { Alert, StyleSheet, TextInput, Text, View, Image, Button } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    }
});

export default class ProfilePage extends Component {

    constructor(props) {
        super(props);
        const {navigation} = this.props;
        this.state = {
            email: null,
        };
        this.state.email=(navigation.getParam('email'));
        
    }

    render() {
        return(
            <View style={styles.container}>
                <Text>Email: {this.state.email}</Text>
                <Text>Profile Page here</Text>
            </View>
        );
    }
}
