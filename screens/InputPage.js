import React, { Component } from 'react';
import { Alert, StyleSheet, TextInput, Text, View, Image, Button} from 'react-native';
//import firebase from 'firebase';

export default class CardInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
        name: null,
        cardnumber: null,
        expiry: null,
        cvc: null
    };
  }   
    
  render() {
    return (
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
        
        <Button
        title={'Update'}
        style={styles.input}
        onPress={this.handleUpdate} />

      </View>
    );
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
     alert(error);
    }
   
    if(Valid)
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
/*
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
*/
}

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
buttonContainer: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  width: '60%'
},
buttonview: {
  width: '60%'
}
});
