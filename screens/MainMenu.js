import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity,AppState, Alert} from 'react-native';
import Dialog from 'react-native-dialog';
import firebase from 'firebase';

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
        const { navigation } = this.props;
        this.state = {
            email: null,
            appState: AppState.currentState,
            dialogVisible: false,
            dialogInput: '',
            inMainPage: true,
        };
        this.state.email = (navigation.getParam('email'));
    }

    componentDidUpdate()
    {
        const { navigation } = this.props;
        if(this.state.inMainPage != true)
        {
            
            this.state.inMainPage = (navigation.getParam('inMainPage'));

        }
    }
    componentDidMount() {
        AppState.addEventListener('change', this._handleAppStateChange);
        
      }
    
      componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange);
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
        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }
    }
    
      handleInput = (typedText) => {
        this.setState({ dialogInput: typedText });
    }

    showDialog = () => {
        this.setState({ dialogVisible: true });
    }

    handleSubmit = () => {
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.dialogInput).then(() => {
            // valid account 
            this.setState({ dialogVisible: false ,dialogInput: ''});
        }).catch(() => {
            Alert.alert('Wrong Password', 'You have entered a wrong password');
        });
    }


      _handleAppStateChange = (nextAppState) => {
        if (
          this.state.appState.match(/inactive|background/) &&
          nextAppState === 'active' && this.state.inMainPage
        ) {
          console.log('App has come to the foreground!');
          this.showDialog();
        }
        this.setState({appState: nextAppState});
      };
      gotoQr =() =>{
        this.props.navigation.navigate('QRScan', { email: this.state.email });
        this.state.inMainPage = false;
        this.props.navigation.setParams({inMainPage: null});
      } 

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.gotoQr}>
                    <Image source={require('../assets/images/qrscan.png')} />
                </TouchableOpacity>
                <Text style={{ fontSize: 20, paddingTop: 15 }}>Scan to Pay</Text>
                <Dialog.Container visible={this.state.dialogVisible}>
                    <Dialog.Title>Enter Password</Dialog.Title>
                    <Dialog.Description>Please enter your password to re-authenticate</Dialog.Description>
                    <Dialog.Input onChangeText={this.handleInput} secureTextEntry={true} />
                    <Dialog.Button label='Submit' onPress={this.handleSubmit} />
                </Dialog.Container>
            </View>
        );
    }
}
