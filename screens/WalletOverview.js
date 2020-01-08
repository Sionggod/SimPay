import React, { Component } from 'react';
import {FlatList, StyleSheet, Text, View, Alert, Button, TouchableOpacity } from 'react-native';  
import firebase from 'firebase';


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
        fontSize: 18,  
        height: 70,  
        width: 280,
        backgroundColor: '#ccc',
        borderColor: 'black',
        borderWidth: 1,
        marginVertical: 10,
        borderRadius: 10,
        
    },  
    listItem: {
        padding: 10,
        marginVertical: 10,
        backgroundColor: '#ccc',
        borderColor: 'black',
        borderWidth: 1
    },
    input: {
        paddingBottom: 20,
        paddingTop: 20,
        alignItems: 'center',
        width: 200,
        height: 40,
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15
    },
});



export default class WalletOverview extends Component {

    constructor(props) {
        super(props);
        const {navigation} = this.props;
        this.state = {
            email: null,
            loading: true,
            
        }
        this.state.email=(navigation.getParam('email'));
        console.log('overview' + this.state.email);
    }   

    ConfirmRemoveCard = (item) => {
        var temp = this.remove_character('@',this.state.email);
        var userEmail = temp.replace(/\./g, '');
        firebase.database().ref('users/'+ userEmail + '/Card/'+item.cardNum).remove();
          
    }

    AlertRemoveCard = (item) => {
        Alert.alert(
            'Remove\n',
            'Card number : ' + item.cardNum,
            [
              {text: 'Yes', onPress: () => this.ConfirmRemoveCard(item)},
              {
                text: 'No',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              
            ],
            {cancelable: false},
          );
    }

    //handling onPress action  
    getListViewItem = (item) => {  

        var it = //item.key + "\n" +
                 item.name + '\n' +
                 item.cardNum + '\n' +
                 item.expiry + '\n' +
                 item.cvc;

                 Alert.alert(
                    'Card Holder : ' + item.name,
                    'Card number : ' + item.cardNum,
                    [
                      {text: 'Remove card', onPress: () => this.AlertRemoveCard(item)},
                      {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                      },
                      
                    ],
                    {cancelable: false},
                  );
        //alert(it);  
        //find item and delete in db
        //rerender the view
    }  
    
    removeGoalHandler = cardId => {
        setCoursegoals(currentGoals => {
            return currentGoals.filter((goal) => goal.id !== goalId);
        });
    };

    remove_character(str_to_remove, str) {
        let reg = new RegExp(str_to_remove)
        return str.replace(reg, '')
    }

    
    DATA = [];

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

        DATA = [];
        var temp = this.remove_character('@',this.state.email);
        var userEmail = temp.replace(/\./g, '');
        firebase.database().ref('users/' + userEmail + '/Card').once('value',function(snapshot) {
            data = {key:'',name:'',cardNum:'',expiry:'',cvc:''}
             snapshot.forEach(function(child) {
                 
                 child.forEach(function(stuff) {
                     if(stuff.key == 'cardno')
                     {
                         data.cardNum = stuff.val();
                     }
                     else if(stuff.key == 'cvc')
                     {
                         data.cvc = stuff.val();
                     }
                     else if(stuff.key == 'expiry')
                     {
                         data.expiry = stuff.val();
                     }
                     else if(stuff.key == 'name')
                     {
                         data.name = stuff.val();
                         
                         
                     }
                     
                     
                 })
                 DATA.push(data);
                 
                 data = {name:'',cardNum:'',expiry:'',cvc:''}
               });
               //getting card info
             //console.log('Lenght of Data is '+DATA.length);
             //console.log(DATA[1].name);
             
         }.bind(this)).then(() => {
            this.setState({loading: false})
         });

      }
      
    

     
    
     
    render() {

         if(this.state.loading) {
             console.log('im called');
             return null;
         }
         

        return(
            <View style={styles.container}>  
               <View>
                   <Text style={{fontSize:25,justifyContent: 'flex-end'}}> 
                      { 'Existing Card'}
                   </Text>
                   <Text style={{fontSize:15,justifyContent: 'flex-end' }}> 
                      { 'Select The Card you wish to remove'}
                   </Text>
               </View>
                <FlatList  
                    data={DATA}  
                    renderItem={({item}) =>  
                        <View style={styles.flat}>
                             <TouchableOpacity style={styles.item} 
                             onPress={this.getListViewItem.bind(this, item)}>
                                <Text>
                                    {'Card No: '+item.cardNum+'\n'+
                                    'Card Name:'+item.name+'\n'+
                                    'Card Expiry Date: ' +item.expiry+'            cvc: '+item.cvc}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    }keyExtractor={(item => item.cardNum)} 
               />  
                <Button
                    title={'Add Card'}
                    style={styles.input}
                    onPress={this.state.loading = true,this.componentWillMount(), ()=>this.props.navigation.navigate('AddCard',{email: this.state.email})} />
            </View>
        );
             
    }
    

}