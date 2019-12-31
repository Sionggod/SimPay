import React, { Component } from 'react';  
import {FlatList,  
    StyleSheet, Text, View,Alert,Button,TouchableOpacity } from 'react-native';  
  
const DATA = [  
    {key:'A',name:'Finnian Koch',cardNum:'1234567890123456',expiry:'11/11',cvc:'111'},
    {key:'B',name:'Adrian Russell',cardNum:'1234567890123456',expiry:'22/22',cvc:'222'},
    {key:'C',name:'Tylor Emerson',cardNum:'1234567890123456',expiry:'33/33',cvc:'333'},
    {key:'D',name:' Edie Moreno',cardNum:'1234567890123456',expiry:'44/44',cvc:'444'},
    {key:'E',name:'Ricardo Hester',cardNum:'1234567890123456',expiry:'55/55',cvc:'555'},
    {key:'F',name:'Tanya Cooper',cardNum:'1234567890123456',expiry:'66/66',cvc:'666'},
    {key:'G',name:'Kieren Knowles',cardNum:'1234567890123456',expiry:'44/44',cvc:'444'},
    {key:'H',name:'Siana Howells',cardNum:'1234567890123456',expiry:'55/55',cvc:'555'},
    {key:'I',name:'Nazia Rasmussen',cardNum:'1234567890123456',expiry:'66/66',cvc:'666'},
    ];


export default class FlatListBasics extends Component {  

    //handling onPress action  
    getListViewItem = (item) => {  

        var it = item.key + "\n" +
                 item.name + '\n' +
                 item.cardNum + '\n' +
                 item.expiry + '\n' +
                 item.cvc;

        alert(it);  
        //find item and delete in db
        //rerender the view
    }  
    
    removeGoalHandler = cardId => {
        setCoursegoals(currentGoals => {
            return currentGoals.filter((goal) => goal.id !== goalId);
        });
    };

    rerender


    render() {  
        return (  
            <View style={styles.container}>  
               
               <View>
                   <Text style={{fontSize:25,justifyContent: 'flex-end' }}> 
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
                    } 
               />  
                <Button
                    title={'Add Card'}
                    style={styles.input}
                    onPress={()=>this.props.navigation.navigate('AddCard')} />
            </View>  
        );  
    }  
}  

const styles = StyleSheet.create({  
    container: {  
        flex: 1,  
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        paddingTop: 50,
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
})  
  
