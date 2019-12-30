import React, { Component } from 'react';
import { Alert, StyleSheet, TextInput, Text, View, Image, Button } from 'react-native';
import firebase from 'firebase';



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
            email: null,
            password: null,
        };
    }

    onLogin() {
        const {email, password} = this.state;
        Alert.alert('Credentials', `Username = ${email}\nPassword = ${password}`);
    }

    remove_character(str_to_remove, str) {
        let reg = new RegExp(str_to_remove)
        return str.replace(reg, '')
      }

    handleLogin = (event) => {

        if(this.state.email != null && this.state.password != null){

        console.log(this.state.email  + ' ' + this.state.password); 
        var temp = this.remove_character('@',this.state.email);
        var userEmail = temp.replace(/\./g, ''); 
        var pw = this.state.password;
        console.log("userEmail is  " + userEmail);
        var validLogin = false;
        //code to retrieve data from DB
        firebase.database().ref('users/' + userEmail).once('value',function(snapshot) {
               var exists = (snapshot.val() !== null);
               if (exists) {
                var userDetails = snapshot.val();
                if(pw == userDetails.password)
                {
                    validLogin = true;
                    console.log('yea its true');
                    this.props.navigation.navigate('Landing');
                }
                
                    
              }
              if(!validLogin) 
                alert('invalid username and/or password'); 
              

            }.bind(this));
            
        }
        else
            alert('Key in a Username and Password');

    }

    UNSAFE_componentWillMount() {
        var config = {
          apiKey: "AIzaSyDwNT6z_uPTNkYpup_E8uQjZ-0_PYDT4QM",
          authDomain: "aspdatabase-7458c.firebaseapp.com",
          databaseURL: "https://aspdatabase-7458c.firebaseio.com",
          projectId: "aspdatabase-7458c",
          storageBucket: "aspdatabase-7458c.appspot.com",
          messagingSenderId: "974951413468",
          appId: "1:974951413468:web:a0d27cbba22d508f51e619",
          measurementId: "G-W02TZC7QT6"
        };
        if(!firebase.apps.length) {
          firebase.initializeApp(config);
        }

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
                onPress={this.handleLogin} />
                <Text style={styles.loginFooter} >Don't have an account yet?</Text>
                <Text style={styles.loginFooter, {color: 'blue', textDecorationLine: 'underline'}}
                onPress={()=>this.props.navigation.navigate('Registration')}>Create new account</Text>
            </View>
        );
    }
}
