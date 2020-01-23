import React, { Component } from 'react';
import {StyleSheet, Text, View, Alert, Picker, SectionList, Platform, Button} from 'react-native';  
import firebase from 'firebase';
import SimpleCrypto from "simple-crypto-js";
import { sha256, sha224 } from 'js-sha256';
import { TouchableOpacity } from 'react-native-gesture-handler';



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
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
    SectionHeaderStyle:{
 
        backgroundColor : 'skyblue',
        fontSize : 20,
        padding: 5,
        color: 'white',
        borderRadius: 3,
      },
     
      SectionListItemStyle:{
     
        fontSize : 17,
        marginVertical: 5,
        backgroundColor : '#F5F5F5',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'black',
     
      },
});



export default class WalletOverview extends Component {

    

    constructor(props) {
        super(props);
        const {navigation} = this.props;
        this.state = {
            duration: "",
            card:"",
            curmonth: new Date().getMonth(),
            curyear: new Date().getFullYear(),
            email: null,
            loading: true,
            token: '',
            called: false,
        }
        this.state.email=(navigation.getParam('email'));
        console.log('overview' + this.state.email);
    }  


    DATA = [];
    
    GetSectionListItem=(item)=>{
        Alert.alert(item)
      }

    RetrieveArray=(item)=>{

    }

    render() {
        var A = ['Apple', 'Apricot', 'Avocado'] ;
        var B = ['Banana', 'Blackberry', 'Blackcurrant', 'Blueberry', 'Boysenberry','a','b','c','d','e','f','p',',','l','k'] ;
        var C = ['Cherry', 'Coconut','l','k,','g',this.state.curmonth] ;
        var D =[];
     

        return(
            <View style={styles.container}>  
               <View style={{paddingTop: 30,flex: 1}}>
                     <Text style={{fontSize:17, fontWeight: 'bold', paddingLeft: '10%'}}> 
                      { 'Transaction Filter'}
                   </Text>
                   <View style={{width:'100%', height: 50, backgroundColor: 'white', flexDirection: 'row'}}>
                        <Picker
                            selectedValue={this.state.duration}
                            onValueChange={(itemValue) => this.setState({duration: itemValue})}
                            style = {{width: '40%', marginLeft: '10%'}}
                            mode="dropdown">
                            <Picker.Item label="1 Month" value="1"/>
                            <Picker.Item label="2 Month" value="2"/>
                            <Picker.Item label="3 Month" value="3"/>
                        </Picker> 
                        <Picker style={{alignContent: 'flex-end'}}
                            selectedValue={this.state.card}
                            onValueChange={(itemValue) => this.setState({card: itemValue})}
                            style = {{width: '40%', paddingLeft: 30}}
                            mode="dropdown">
                            <Picker.Item label="Card 1" value="1"/>
                            <Picker.Item label="Card 2" value="2"/>
                            <Picker.Item label="Card 3" value="3"/>
                        </Picker>
                   </View>  
                   <View style={{height: 40,flexDirection: 'row-reverse', backgroundColor: 'white', }}>
                        <TouchableOpacity style={styles.button}>
                            <Text>Refresh</Text>
                        </TouchableOpacity>
                   </View>
                   
               </View>
               <View style={{paddingTop: 130, width: '94%',paddingBottom:15,paddingLeft:'3%'}}>
                    <SectionList
                        style={{backgroundColor: 'white'}}
                        sections={[
                        { title: 'January', data: A },
                        { title: 'February', data: B },
                        { title: 'March', data: D },
                        ]}

                        renderSectionHeader={ ({section}) => <Text style={styles.SectionHeaderStyle}> { section.title } </Text> }
                        renderItem={ ({item}) => <Text style={styles.SectionListItemStyle}>
                            <Text style={{fontSize: 13}}>
                                {" 23-January 2020 Date\n "}
                            </Text>
                            { "Merchant detail" + '\n ' + "Amount spended"} </Text> }
                        
                        keyExtractor={ (item, index) => index }
                    
                    />
                </View> 
            </View>
        );
             
    }
    

}