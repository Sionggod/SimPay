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
        width: 140,
        height: 130,
    },
});

export default class RegistrationPage extends Component {

    constructor(props) {
        super(props);
        this.state ={name: ''};
        this.state ={email: ''};
        this.state ={Hp: ''};
        this.state ={Pw: ''};
    }
    handleNameText = (typedText) => {
        this.setState({name:typedText}, () => {
          console.log(this.state.name);
        });
      }
      handleEmailText = (typedText) => {
        this.setState({email:typedText}, () => {
          console.log(this.state.email);
        });
      }
      handleHpText = (typedText) => {
        this.setState({Hp:typedText}, () => {
          console.log(this.state.Hp);
        });
      }
      handlePwText = (typedText) => {
        this.setState({Pw:typedText}, () => {
          console.log(this.state.Pw);
        });
      }

      handleSubmit = (event) => {
        // do something after submit
        firebase.database().ref('users/'+ this.state.Hp).set(
            {
                name: this.state.name,
                email: this.state.email,
                phone: this.state.Hp,
                password: this.state.Pw,
            }
        ).then(()=> {
            this.props.navigation.navigate('Login');
            console.log(this.state.name ,'inserted');
        }).catch((error) => {

        });
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
        return(
            <View style={styles.container}>
                <Image
                source={require('../assets/images/credit-card.png')}
                style={styles.logo} />
                <Text style={{fontSize: 30, marginBottom: 15}}>Create New Account</Text>
                <TextInput style={styles.input} placeholder={'Full Name'} 
                onChangeText={this.handleNameText}  value={this.state.name}></TextInput>
                <TextInput style={styles.input} placeholder={'E-mail'}
                onChangeText={this.handleEmailText}  value={this.state.email}></TextInput>
                <TextInput style={styles.input} placeholder={'Phone Number'}
                onChangeText={this.handleHpText}  value={this.state.Hp}></TextInput>
                <TextInput style={styles.input} placeholder={'Password'} secureTextEntry={true} ></TextInput>
                <TextInput style={styles.input} placeholder={'Verify Password'} secureTextEntry={true} 
                onChangeText={this.handlePwText}  value={this.state.Pw}></TextInput>
                <Button
                title='Sign Up'
                onPress={this.handleSubmit}/>
                <Button title={'Back'} style={styles.input} onPress={()=>this.props.navigation.navigate('Login')} />
            </View>
   
        );
    }
  
}

