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
    logo: {
        width: 140,
        height: 130,
    },
});

export default class RegistrationPage extends Component {
    render() {
        return(
            <View style={styles.container}>
                <Image
                source={require('../assets/images/credit-card.png')}
                style={styles.logo} />
                <Text style={{fontSize: 30, marginBottom: 15}}>Create New Account</Text>
                <TextInput style={styles.input} placeholder={'Full Name'}></TextInput>
                <TextInput style={styles.input} placeholder={'E-mail'}></TextInput>
                <TextInput style={styles.input} placeholder={'Phone Number'}></TextInput>
                <TextInput style={styles.input} placeholder={'Password'} secureTextEntry={true} ></TextInput>
                <TextInput style={styles.input} placeholder={'Verify Password'} secureTextEntry={true} ></TextInput>
                <Button
                title={'Sign Up'}
                style={styles.input}
                onPress={()=>this.props.navigation.navigate('Login')} />
                <Button title={'Back'} style={styles.input} onPress={()=>this.props.navigation.navigate('Login')} />
            </View>
        );
    }
}
