import React, { Component } from 'react';
import { Alert, StyleSheet, TextInput, Text, View, Image, Button, ScrollView, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
});

export default class MainMenu extends Component {

    constructor(props) {
        super(props);
        const {navigation} = this.props;
        this.state = {
            email: null,
        };
        this.state.email=(navigation.getParam('email'));
        console.log('QRMain ' + this.state.email);
    }
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('QRScan',{email: this.state.email})}>
                    <Image source={require('../assets/images/qrscan.png')} />
                </TouchableOpacity>
                <Text style={{fontSize: 20, paddingTop: 15}}>Scan to Pay</Text>
            </View>
        );
    }
}
