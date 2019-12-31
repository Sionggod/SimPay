import React, { Component } from 'react';
import { Alert, StyleSheet, TextInput, Text, View, Image, Button, ScrollView } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
});

export default class MainMenu extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>This is the main page</Text>
                <Button
                title={'Add Card'}
                onPress={()=>this.props.navigation.navigate('AddCard')} />
                <Button
                title={'Start Scanning'}
                onPress={()=>this.props.navigation.navigate('QRScan')} />
            </View>
        );
    }
}
