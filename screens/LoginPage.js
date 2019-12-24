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
        width: 160,
        height: 150
    },
    forget: {
        marginBottom: 15,
        color: 'blue',
        textDecorationLine: 'underline',
        textAlign: 'right',
        alignItems: 'flex-end'
    },
    loginFooter: {
        marginTop: 25
    }
    });

export default class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
        };
    }

    onLogin() {
        const {email, password} = this.state;
        Alert.alert('Credentials', `Username = ${email}\nPassword = ${password}`);
    }

    render() {
        return (
            <View style={styles.container}>
                <Image
                source={require('../assets/images/credit-card.png')}
                style={styles.logo} />
                <Text style={{fontSize: 28, marginBottom: 25}}>WELCOME</Text>
                <TextInput
                value={this.state.email}
                onChangeText={(email)=>this.setState({email})}
                placeholder={'Email'}
                style={styles.input} />
                <TextInput
                value={this.state.password}
                onChangeText={(password)=>this.setState({password})}
                placeholder={'Password'}
                secureTextEntry={true}
                style={styles.input} />
                <Text style={styles.forget} >Forget Password?</Text>
                <Button
                title={'Login'}
                style={styles.input}
                onPress={()=>this.props.navigation.navigate('Landing')} />
                <Text style={styles.loginFooter} >Don't have an account yet?</Text>
                <Text style={styles.loginFooter, {color: 'blue', textDecorationLine: 'underline'}}
                onPress={()=>this.props.navigation.navigate('Registration')}>Create new account</Text>
            </View>
        );
    }
}
