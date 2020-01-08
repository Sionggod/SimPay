import React, { Component } from 'react';
import { Alert, StyleSheet, TextInput, Text, View, Image, Button, KeyboardAvoidingView, TouchableOpacity } from 'react-native';

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
    button: {
        width: 120,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        backgroundColor: '#99ccff',
    }
});

export default class PaymentPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            amount: '',
        }
    }
    render () {
        // get merchant ID from previous screen
        const merchantID = this.props.navigation.getParam('merchantID');
        return (
            <KeyboardAvoidingView style={styles.container} behaviour='padding' enabled>
            <View style={styles.container}>
                <Text>Vendor Name:</Text>
                <Text>Merchant ID = {merchantID}</Text>
                <Text>Input amount (S$):</Text>
                <TextInput style={styles.input} keyboardType={'numeric'} value={this.state.amount} onChangeText={(amount)=>this.setState({amount})} />
                <TouchableOpacity style={styles.button} onPress={()=>this.props.navigation.navigate('ConfirmPayment', {merchantID: merchantID, amountPayable: this.state.amount})}>
                    <Text>Next</Text>
                </TouchableOpacity> 
            </View>
            </KeyboardAvoidingView>
        );
    }
}
