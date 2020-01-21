import React, { Component } from 'react';
import { Animated, StatusBar, Alert, StyleSheet, TextInput, Text, View, Image, Button,TouchableOpacity } from 'react-native';
import firebase from 'firebase';

const styles = StyleSheet.create({
    contentContainer: {
        width: "100%",
        aspectRatio: 1
    },
    header: {
        fontWeight:'bold',
        fontSize:28,
        alignSelf:'flex-start'
    },
    header2: {
        fontWeight:'bold',
        fontSize:20,
        alignSelf:'flex-start',
        backgroundColor:'#d3d3d3',
        width: 500
    },
    button: {
        width: 100,
        padding: 5,
        borderRadius: 5,
        alignItems: 'center',
        backgroundColor: '#99ccff',
        alignSelf:'flex-end'
    },
    TextBox:{
        height: 26,
        fontSize: 20,
        color: '#000',
        borderBottomWidth: 1,
        borderBottomColor: '#555'
    },
});

class FloatingLabelInput extends Component {


    state = {
        isFocused: false,
    };

    componentWillMount() {
      this._animatedIsFocused = new Animated.Value(this.props.value === '' ? 0 : 1);
    }


    handleFocus = () => this.setState({ isFocused: true });
    handleBlur = () => this.setState({ isFocused: false });

    componentDidUpdate() {
      Animated.timing(this._animatedIsFocused, {
        toValue: (this.state.isFocused || this.props.value !== '') ? 1 : 0,
        duration: 200,
    }).start();
    }


    render() {
        const { label, ...props } = this.props;
        const { isFocused } = this.state;
        const labelStyle = {
          position: 'absolute',
          left: 0,
          top: this._animatedIsFocused.interpolate({
            inputRange: [0, 1],
            outputRange: [18, 0],
          }),
          fontSize: this._animatedIsFocused.interpolate({
            inputRange: [0, 1],
            outputRange: [20, 14],
          }),
          color: this._animatedIsFocused.interpolate({
            inputRange: [0, 1],
            outputRange: ['#aaa', '#000'],
          }),
        };
    return (
        <View style = {{paddingTop: 18}}>
             <Animated.Text style = {labelStyle}>
                {label}
             </Animated.Text>
             <TextInput {...props} style = {styles.TextBox} onFocus={this.handleFocus} onBlur={this.handleBlur} blurOnSubmit/>
        </View>
        );
    }
}
export default class ProfilePage extends Component {
    constructor(props) {
        super(props);
        const {navigation} = this.props;
        this.state = {
            email: null,
            phone: null,
            name: null,
            verified: '(un-verified)',
            value: '',
            nameText: '',
            emailText: '',
            phoneText: '',
            show: true,

        };
        handleTextChange = (newText) => this.setState({ value:newText});
        this.state.email=(navigation.getParam('email'));
    }

    remove_character(str_to_remove, str) {
        let reg = new RegExp(str_to_remove)
        return str.replace(reg, '')
      }

     
    componentWillMount() {
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

        var temp = this.remove_character('@',this.state.email);
           var userEmail = temp.replace(/\./g, ''); 
           console.log("userEmail is  " + userEmail);
           firebase.database().ref('users/' + userEmail).once('value',function(snapshot) {
            this.setState({phone: snapshot.val().phone});
          }.bind(this));

          var user = firebase.auth().currentUser;
          this.setState({name: user.displayName});
          if(user.emailVerified){
            this.setState({verified: '(verified)',show: false});
          }
    }
 

    EditDetails = ()=> {
        if(this.state.nameText != '' && this.state.nameText != null && this.state.name != this.state.nameText)
        {
            this.setState({name: this.state.nameText});
        }
        if(this.state.phoneText != '' && this.state.phoneText != null && this.state.phone != this.state.phoneText)
        {
            this.setState({phone: this.state.phoneText});
        }
        
        
        
        console.log('name: ' + this.state.name);
        console.log('phone: '+this.state.phone);

    }

    VerifyEmail = () => {

        var user = firebase.auth().currentUser;

        user.sendEmailVerification().then(function() {
        // Email sent.
        console.log('Email sent');
        this.setState({show: false});
        }).catch(function(error) {
        // An error happened.
        });

       

    }

    render() {
        return(
            <View style={styles.contentContainer}>
                <Text style ={styles.header}>Profile Details </Text>
                <StatusBar hidden/>
                <Text style = {styles.header2}>Email: </Text>
        <Text style = {{color: "#aaa",fontSize: 20,alignSelf:'flex-start'}}> {this.state.email}{this.state.verified}</Text>
                <Text style = {styles.header2}>Mobile Number:</Text>
                <FloatingLabelInput label = {this.state.phone} returnKeyType='done' keyboardType={'numeric'} value ={this.state.phoneText} onChangeText={(phoneText)=>this.setState({phoneText})} />
                <Text style = {styles.header2}>Name: </Text>
                <FloatingLabelInput label = {this.state.name}  value ={this.state.nameText} onChangeText={(nameText)=>this.setState({nameText})} />

                <TouchableOpacity style={styles.button} onPress={this.EditDetails}>
                    <Text>Edit Details</Text>
                </TouchableOpacity>
                {this.state.show ? (<TouchableOpacity style={styles.button} onPress={this.VerifyEmail}>
                    <Text>Verify Email</Text>
                </TouchableOpacity>) : null }
                
            </View>
        );
    }
}

