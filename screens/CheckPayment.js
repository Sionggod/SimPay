import React, { Component } from 'react';
import { FlatList,Alert, StyleSheet, TextInput, Text, View, Image, Button, TouchableOpacity,ImageBackground } from 'react-native';
import axios from 'axios';
import firebase from 'firebase';
var stripe = require('stripe-client')('pk_test_gA0EY3yvEnOSzsVZaWj3fAVb004i1hK2K9');
import SimpleCrypto from "simple-crypto-js";

var _secretKey = "123456";
 
var simpleCrypto = new SimpleCrypto(_secretKey);

const styles = StyleSheet.create({
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
            DATA: [],
            loading: true,
            cardUsed: 'Please select a card',
            Cardnumber: null,
            exp_month: '02',
            exp_year: '21',
            cvc: null,
            Cardname: null,
        };
        // console.log('Merchant id : ' + this.state.merchantID);
        //  console.log('amt : '+ this.state.amt);
        //  console.log('email : ' + this.state.email);

         

    }
    remove_character(str_to_remove, str) {
        let reg = new RegExp(str_to_remove)
        return str.replace(reg, '')
    }


    onPayment = async () =>  {
        
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
        if(this.state.token != null){
            //Code below transfers amount to merchant registered under our stripe accounts
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
            {merchantID: this.state.merchantID,amountPayable: this.state.amt,email: this.state.email,card: this.state.cardUsed});
        });
         }
         else{
             alert('Something went wrong with your card');
         }
        
      };
    

      getListViewItem = (item) => {  

    
          console.log(item.cardNum);
                 Alert.alert(
                    'Card Holder : ' + item.name,
                    'Card number : ' + item.cardNum,
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
        this.setState({cardUsed: item.cardNum,Cardnumber: item.cardNum
            ,Cardname: item.name,cvc: item.cvc,exp_month: item.expirymonth,
            exp_year: item.expiryyear});
        // console.log(this.state.Cardnumber);
        // console.log(this.state.Cardname);
        // console.log(this.state.cvc);
    }

      

    DATA2 = [];

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
            }

          }.bind(this));

           //Get user token
        var temp = this.remove_character('@',this.state.email);
        var userEmail = temp.replace(/\./g, ''); 
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
                  })
                  DATA2.push(data);
               
                  data = {name:'',cardNum:'',expirymonth:'',expiryyear:'',cvc:''}
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

<FlatList  
                    data={DATA2}  
                    renderItem={({item}) =>  
                        <View style={styles.flat}>
                            {/* var type = "";
                            if(item.cardtype == 'master'){
                                type = '../assets/images/cardmaster.jpg';
                            } else if (item.cardtype == 'visa'){
                                type = '../assets/images/cardvisa.jpg';
                            } */}
                            <TouchableOpacity style={styles.item} 
                             onPress={this.getListViewItem.bind(this, item)}>
                            
                            <ImageBackground source={require('../assets/images/cardmaster.jpg')} style={{width: '100%', height: '100%'}}>
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
                <Text>Vendor Name:</Text>
                <Text>Merchant ID = {this.state.merchantID}</Text>
                <Text>Input amount (S$): {this.state.amt}</Text>
                <TouchableOpacity style={styles.button} 
                onPress={this.onPayment}>
                    <Text>confirm payment</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
