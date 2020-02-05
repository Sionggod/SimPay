import React, { Component } from 'react';
import { FlatList,Alert, StyleSheet, TextInput, Text, View, Image, Button, TouchableOpacity,ImageBackground, Modal, 
    TouchableHighlight, Platform } from 'react-native';
import axios from 'axios';
import firebase from 'firebase';
var stripe = require('stripe-client')('pk_test_gA0EY3yvEnOSzsVZaWj3fAVb004i1hK2K9');
import SimpleCrypto from "simple-crypto-js";
import { sha256} from 'js-sha256';
import Spinner from 'react-native-loading-spinner-overlay';
import * as LocalAuthentication from 'expo-local-authentication';
import Dialog from 'react-native-dialog';

const styles = StyleSheet.create({
    spinnerTextStyle: {
        color: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
      },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },  
    flat:{
        flex: 1,
          
    },
    item: {  
        alignItems: 'center',
        justifyContent: 'center', 
        height: 180,  
        width: 300,
        marginVertical: 10,
        
    },  
    listItem: {
        padding: 10,
        marginVertical: 10,
        backgroundColor: '#ccc',
        borderColor: 'black',
        borderWidth: 1
    },
    button: {
        alignItems: 'center',
        width: 150,
        padding: 10,
        borderRadius: 5,
        marginBottom: 15,
        backgroundColor: '#99ccff',
    },
    modal: {
        flex: 1,
        marginTop: '90%',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
      },
});

export default class CheckPayment extends Component {

    constructor(props) {
        super(props);
        const {navigation} = this.props;
        // get merchant ID and amount keyed in from previous screen
        this.state = {
            merchantID: this.props.navigation.getParam('merchantID'),
            amt: this.props.navigation.getParam('amountPayable'),
            email: this.props.navigation.getParam('email'),
            token: null,
            merchantAccount: null,
            BusinessType: null,
            DATA: [],
            loading: true,
            cardUsed: 'Please select a card',
            Cardnumber: null,
            exp_month: '02',
            exp_year: '21',
            cvc: null,
            Cardname: null,
            processing: false,
            spinner: false,
            bioHash: '',
            authenticated: false,
            modalVisible: false,
            failedCount: 0,
            dialogVisible: false,
            dialogInput: '',
            secondPassCheck: null,
            tap: 0,
        };
        // console.log('Merchant id : ' + this.state.merchantID);
        //  console.log('amt : '+ this.state.amt);
        //  console.log('email : ' + this.state.email);

         

    }
    remove_character(str_to_remove, str) {
        let reg = new RegExp(str_to_remove)
        return str.replace(reg, '')
    }

    handleInput = (typedText) => {
        this.setState({dialogInput: typedText});
    }

    showDialog = () => {
        this.setState({ dialogVisible: true });
    }
    
    handleCancel = () => {
        this.setState({ dialogVisible: false });
    }

    handleSubmit = () => {
        console.log('Password entered in input box = ' + this.state.dialogInput);
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.dialogInput).then(()=> {
            // valid account 
            this.setState({secondPassCheck: true});
            this.handleCancel();
            this.onPayment();
        }).catch(()=> {
            Alert.alert('Wrong Password', 'You have entered a wrong password');
        });
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    scanBiometrics = async ()=> {

        
        this.state.tap = this.state.tap+1;
        this.setState({
            failedCount: 0
          });
        if(this.state.cardUsed == 'Please select a card')
        {
       
             alert('Please select a card');
        }
        else
        {
            if(this.state.tap == 1)
            {
        if (this.state.bioHash == '') {
            // user did not bind biometrics
            this.showDialog();
        } else {
            // user has bound biometrics
            try {
                this.setState({modalVisible: true});
                let result = await LocalAuthentication.authenticateAsync({promptMessage: 'Use your device biometrics to complete payment', fallbackLabel: 'Use Passcode'});
                
                const deviceId = Expo.Constants.deviceId;
                // hash user email with unique device id
                var concatEmailDeviceId = firebase.auth().currentUser.email + deviceId;
                const hashedDeviceId = sha256(concatEmailDeviceId);
                if(result != null )
                {
                if (result.success && (hashedDeviceId == this.state.bioHash)) {
                    console.log('SUCCESS!');
                  this.setState({
                    modalVisible: false,
                    authenticated: true,
                    failedCount: 0,
                  });
                  
                  this.onPayment();
                } else {
                    console.log(" failed ");
                  this.setState({
                    failedCount: 1
                  });
                  //this.scanBiometrics();
                }
            }
              } catch (e) {
                console.log(e);
              }
            
        }
        this.state.tap = 0;
        }
    }

        
}

    onPayment = async () =>  {

     

        if(this.state.processing == false)
        {
        var information = {
            card: {
                number: this.state.Cardnumber,
                exp_month: this.state.exp_month,
                exp_year: this.state.exp_year,
                cvc: this.state.cvc,
                name: this.state.Cardname,
            }
        }
        // code below is to get token from stripe api
            var card = await stripe.createToken(information);
            this.state.token = card.id;
            //console.log('token is ' + this.state.token);
        if(this.state.token != null && (this.state.authenticated == true) || this.state.token != null && (this.state.secondPassCheck == true)) {
            //Code below transfers amount to merchant registered under our stripe accounts
            this.setState({processing: true, spinner: true});
        axios({
            method: 'POST',
            url:'https://us-central1-aspdatabase-7458c.cloudfunctions.net/payWithStripe',
            data: {
                amount: this.state.amt*100,
                currency: 'sgd',
                token: this.state.token,
                destination: this.state.merchantAccount,
                
            },
        }).then(response => {
            console.log(response);
            this.props.navigation.navigate('PaymentSummary',
            {merchantID: this.state.merchantID,amountPayable: this.state.amt,email: this.state.email,card: this.state.Cardnumber,type: this.state.BusinessType});
            this.setState({processing: false,spinner: false});
        });
         }
         else{
             alert('Something went wrong with your card');
             this.setState({processing: false});
         }
        }
        else
        console.log("Payment is processing");
        
       

      };
    

      getListViewItem = (item) => {  

    
          console.log(item.cardNum);
                 Alert.alert(
                    'Card Holder : ' + item.name,
                    'Card number : ' + '****   ****   ****   ' + item.cardNum.substring(item.cardNum.length-4,item.cardNum.length),
                    [
                      {text: 'Confirm', onPress: () => this.ShowCardUsed(item)},
                      {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                      },
                      
                    ],
                    {cancelable: false},
                  );

    }  

    ShowCardUsed(item){
        var carddetail = '****   ****   ****   ' + item.cardNum.substring(item.cardNum.length-4,item.cardNum.length);
        this.setState({cardUsed: carddetail,Cardnumber: item.cardNum
            ,Cardname: item.name,cvc: item.cvc,exp_month: item.expirymonth,
            exp_year: item.expiryyear});
        // console.log(this.state.Cardnumber);
        // console.log(this.state.Cardname);
        // console.log(this.state.cvc);
    }

      

    DATA2 = [];

    reduction(email) {
        temp = sha256(email);
        for(i=0; i < 3;i++)
        {
          temp = sha256(temp.substring(0,32));
        }
        return temp;
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

        firebase.database().ref('Merchants/' + this.state.merchantID).once('value',function(snapshot) {
            var exists = (snapshot.val() !== null);
            if (exists) {
                this.state.merchantAccount = snapshot.val().account;
                this.state.BusinessType = snapshot.val().type;
            }

          }.bind(this));

           //Get user token
        var temp = this.remove_character('@',this.state.email);
        var userEmail = temp.replace(/\./g, ''); 

        firebase.database().ref('users/' + userEmail).once('value',function(snapshot) {
            this.setState({bioHash: snapshot.val().biometricData});
        }.bind(this));

        var _secretKey = this.reduction(this.state.email);
 
        var simpleCrypto = new SimpleCrypto(_secretKey);

        firebase.database().ref('users/' + userEmail+'/Card/')
        .once('value',function(snapshot) {
          var exists = (snapshot.val() !== null);
          if (exists) {
            DATA2 = [];
              snapshot.forEach(function(child) {
               
                  child.forEach(function(stuff) {
                    if(stuff.key == 'cardno')
                    {
                        data.cardNum = simpleCrypto.decrypt(stuff.val());
                    }
                    else if(stuff.key == 'cvc')
                    {
                        data.cvc = simpleCrypto.decrypt(stuff.val());
                    }
                    else if(stuff.key == 'expirymonth')
                    {
                        data.expirymonth = simpleCrypto.decrypt(stuff.val());
                    }
                    else if(stuff.key == 'expiryyear')
                    {
                        data.expiryyear = simpleCrypto.decrypt(stuff.val());
                    }
                    else if(stuff.key == 'name')
                    {
                        data.name = simpleCrypto.decrypt(stuff.val());
                    }
                    else if(stuff.key == 'brand')
                     {
                        var brand = simpleCrypto.decrypt(stuff.val());
                        console.log(brand);
                        if(brand == 'MasterCard')
                        {
                            data.brand = require('../assets/images/cardmaster.jpg');
                        }
                        else if(brand == 'Visa')
                        {
                            data.brand = require('../assets/images/cardvisa.jpg');
                        }
                        else
                        {
                            data.brand = require('../assets/images/carddefault.jpg');
                        }
                     }
                     else if(stuff.key == 'Status')
                     {
                         data.status = stuff.val();
                     }
                  })
                  if(data.status == 'Active')
                    DATA2.push(data);
               
                  data = {name:'',cardNum:'',expirymonth:'',expiryyear:'',cvc:'',brand:''}
              });

          
               
         }
   
         

       }.bind(this)).then(() => {
        this.setState({loading: false})
     });
           
         
    }
    render () {

        if(this.state.loading) {
            console.log('im called');
            return null;
        }
        
        return (
            <View style={styles.container}>
                <Spinner
          visible={this.state.spinner}
          textContent={'Processing payment...'}
          textStyle={styles.spinnerTextStyle}
        />
                <FlatList  
                    data={DATA2}  
                    renderItem={({item}) =>  
                        <View style={styles.flat}>
                            <TouchableOpacity style={styles.item} 
                             onPress={this.getListViewItem.bind(this, item)}>
                            
                            <ImageBackground source={item.brand} style={{width: '100%', height: '100%'}}>
                                <Text style={{fontSize:18, fontWeight: 'bold', color:'white',paddingTop: '30%', paddingLeft: '10%'}}>
                                    {'****   ****   ****   '+item.cardNum.substring(item.cardNum.length-4,item.cardNum.length)}
                                </Text>
                                <Text style={{fontSize:18, fontWeight: 'bold', color:'white',paddingTop: '1%',paddingLeft:'10%'}}>  
                                    <Text style={{fontSize: 10}}>
                                    {
                                      item.name +   '                Good thru '
                                    }
                                    </Text>
                                    {
                                      item.expirymonth+'/'+item.expiryyear
                                    }
                                </Text>
                            </ImageBackground>
                            </TouchableOpacity>
                        </View>
                    }keyExtractor={(item => item.cardNum)} 
               />  
                <Text>Card used : {this.state.cardUsed}</Text>
                <Text>Vendor Type: {this.state.BusinessType}</Text>
                <Text>Merchant ID = {this.state.merchantID}</Text>
                <Text>Input amount (S$): {this.state.amt}</Text>
                <TouchableOpacity style={styles.button} 
                onPress={()=> {

                        this.scanBiometrics();
                }}>
                    <Text>Confirm Payment</Text>
                </TouchableOpacity>
                <Dialog.Container visible={this.state.dialogVisible}>
                    <Dialog.Title>Enter Password</Dialog.Title>
                    <Dialog.Description>Please enter your password to complete the payment</Dialog.Description>
                    <Dialog.Input onChangeText={this.handleInput} secureTextEntry={true} />
                    <Dialog.Button label='Cancel' onPress={this.handleCancel} />
                    <Dialog.Button label='Submit' onPress={this.handleSubmit} />
                </Dialog.Container>

                {Platform.OS === 'android' ? 
                <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.modalVisible}
                onShow={this.scanBiometrics}>
                <View style={styles.modal}>
                    <View style={styles.innerContainer}>
                    <Text>Sign in with fingerprint</Text>
                    {this.state.failedCount ?  <Text style={{ color: 'red', fontSize: 14 }}>
                        Failed to authenticate, press cancel and try again.
                        </Text> : null
                       
                    }
                    <TouchableHighlight
                        onPress={async () => {
                        LocalAuthentication.cancelAuthenticate();
                        this.setState({modalVisible: false});
                        }}>
                        <Text style={{ color: 'red', fontSize: 16 }}>Cancel</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        onPress={async () => {
                        LocalAuthentication.cancelAuthenticate();
                        this.setState({modalVisible: false});
                        this.showDialog();
                        }}>
                        <Text style={{ color: 'red', fontSize: 16 }}>Use password</Text>
                    </TouchableHighlight>
                    </View>
                </View>
                </Modal>
        : null}
            </View>
        );
    }
}
