import React, { Component } from 'react';
import { Alert, StyleSheet, TextInput, Text, View, Image, Button } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    input: {
        width: 200,
        height: 45,
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15
    },
});

export default class CheckPayment extends Component {
    render () {
        // get merchant ID and amount keyed in from previous screen
        const merchantID = this.props.navigation.getParam('merchantID');
        const amt = this.props.navigation.getParam('amountPayable');
        return (
            <View style={styles.container}>
                <Text>Vendor Name:</Text>
                <Text>Merchant ID = {merchantID}</Text>
                <Text>Input amount (S$):</Text>
                <Text>{amt}</Text>
            </View>
        );
    }
}
