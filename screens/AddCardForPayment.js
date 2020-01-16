import React, { Component } from 'react';
import { Animated,Dimensions,Keyboard,UIManager,Alert, StyleSheet, TextInput, Text, View, Image, TouchableOpacity, Button, KeyboardAvoidingView } from 'react-native';
import firebase from 'firebase';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    input: {
        alignItems: 'center',
         width: 200,
         height: 40,
         padding: 10,
         borderWidth: 1,
         borderRadius: 5,
         marginBottom: 15
     },
     inputtext: {
         fontSize: 12
     },
     cardimage: {
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
     },
     button: {
      width: 100,
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
      backgroundColor: '#99ccff',
  }
});
const { State: TextInputState } = TextInput;
export default class AddCardForPayment extends Component {
    constructor(props) {
        super(props);
        const {navigation} = this.props;
        this.state = {
            email: null,
            name: null,
            cardnumber: null,
            expiry: null,
            cvc: null,
            shift: new Animated.Value(0),
            merchantID: this.props.navigation.getParam('merchantID'),
            amount: this.props.navigation.getParam('amountPayable'),

        };
        this.state.email=(navigation.getParam('email'));
        
    }   

    componentWillMount() {
      this.keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', this.handleKeyboardDidShow);
      this.keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', this.handleKeyboardDidHide);
    }
  
    componentWillUnmount() {
      this.keyboardDidShowSub.remove();
      this.keyboardDidHideSub.remove();
    }

    remove_character(str_to_remove, str) {
        let reg = new RegExp(str_to_remove)
        return str.replace(reg, '')
    }

    handleUpdate = () => {
     
        var Valid = true;
        if(this.state.name == null|| this.state.cardnumber == null || 
          this.state.expiry == null|| this.state.cvc == null ){
          console.log("missing fields");
          var missingfields = "";
          if(this.state.name == null){
            missingfields += "Name not filled\n";
            Valid = false;
          }
         
          if(this.state.cardnumber == null){
            missingfields +="Card Number not filled\n";
            Valid = false;
          }
         
          if(this.state.expiry == null){
            missingfields +="Expiry Date not filled\n";
            Valid = false;
          }
          
          if(this.state.cvc == null){
            missingfields +="Security Code not filled\n";
            Valid = false;
          }
          alert(missingfields);
        }
        else {
          var error = "";
          if(this.state.cardnumber.length < 12 || this.state.cardnumber.length > 19 ){
            Valid = false;
            error +='Card Number has invalid length\n';
    
            if(isNaN(this.state.cardnumber))
            {
              Valid = false;
              error +='Please Input only numerical for card number!\n';
            }
           }
    
          if(this.state.expiry != null){
            if(isNaN(this.state.expiry))
            {
              Valid = false;
              error +='Please Input only numerical for expiry date!\n';
            }
          }
    
          if(this.state.cvc != null){
            if(isNaN(this.state.cvc))
            {
              Valid = false;
              error +='Please Input only numerical for CVC!\n';
            }
          }
          if(!Valid)
            Alert.alert('Invalid Input', error);
        }
       
       
        if(Valid)
        {

          var temp = this.remove_character('@',this.state.email);
        var userEmail = temp.replace(/\./g, ''); 
      
        firebase.database().ref('users/'+ userEmail+ '/Card/'+this.state.cardnumber).set(
          {
             name: this.state.name,
             cardno: this.state.cardnumber,
             cvc: this.state.cvc,
             expiry: this.state.expiry,
         }
        ).then(()=> {
          this.props.navigation.navigate('ConfirmPayment',{email: this.state.email,merchantID: this.state.merchantID,amountPayable: this.state.amount});
          console.log(this.state.name ,'Card inserted');
       
        
      }).catch((error) => {
  
      });

          // missingfields = "";
          // missingfields +=this.state.name;
          // missingfields +="\n";
          // missingfields +=this.state.cardnumber;
          // missingfields +="\n";
          // missingfields +=this.state.expiry;
          // missingfields +="\n";
          // missingfields +=this.state.cvc;
          // missingfields +="\n";
          // missingfields +=Valid;
          // alert(missingfields);
      
          
    
        }
        else
        {
          missingfields = "";
          missingfields +=this.state.name;
          missingfields +="\n";
          missingfields +=this.state.cardnumber;
          missingfields +="\n";
          missingfields +=this.state.expiry;
          missingfields +="\n";
          missingfields +=this.state.cvc;
          missingfields +="\n";
          missingfields +=Valid;
          alert(missingfields);
        }
        
        
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
      const { shift } = this.state;
        return(
          <Animated.View style={[styles.container, { transform: [{translateY: shift}] }]}>
            <View style={styles.container}>
                <Text style={{fontSize: 28, marginBottom: 25}}>Card Input Form</Text>   

                <Text style={styles.inputtext}>Name On Card</Text>
                <TextInput
                value={this.state.name}
                onChangeText={(name)=>this.setState({name})}
                style={styles.input} />

                <Text style={styles.inputtext}>Card Number</Text>
                <TextInput
                value={this.state.cardnumber}
                onChangeText={(cardnumber)=>this.setState({cardnumber})}
                style={styles.input} />

                <Text style={styles.inputtext}>Expiry Date</Text>  
                <TextInput
                value={this.state.expiry}
                onChangeText={(expiry)=>this.setState({expiry})}
                placeholder={'MM/YY'}
                style={styles.input} />

                <Text style={styles.inputtext}>Security Code(CVC/CVV)</Text>  
                <TextInput
                value={this.state.cvc}
                onChangeText={(cvc)=>this.setState({cvc})}
                style={styles.input} />
                <TouchableOpacity onPress={this.handleUpdate} style={styles.button}>
                    <Text>Proceed to payment</Text>
                </TouchableOpacity>
            </View>
            </Animated.View>
        );
    }

    handleKeyboardDidShow = (event) => {
      const { height: windowHeight } = Dimensions.get('window');
      const keyboardHeight = event.endCoordinates.height;
      const currentlyFocusedField = TextInputState.currentlyFocusedField();
      UIManager.measure(currentlyFocusedField, (originX, originY, width, height, pageX, pageY) => {
        const fieldHeight = height;
        const fieldTop = pageY;
        const gap = (windowHeight - keyboardHeight) - (fieldTop + fieldHeight);
        if (gap >= 0) {
          return;
        }
        Animated.timing(
          this.state.shift,
          {
            toValue: gap,
            duration: 200,
            useNativeDriver: true,
          }
        ).start();
      });
    }
  
    handleKeyboardDidHide = () => {
      Animated.timing(
        this.state.shift,
        {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }
      ).start();
    }
}