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
    render() {
        return(
            <View style={styles.container}>
                <Text>Profile Page here</Text>
            </View>
        );
    }
}
