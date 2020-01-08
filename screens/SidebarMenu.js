import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, Button, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
    sideMenuContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingTop: 60,
        paddingLeft: 15
    },
    sideMenuProfileIcon: {
        resizeMode: 'center',
        width: 150,
        height: 150,
        marginTop: 20,
        borderRadius: 150 / 2,
    },
    button: {
        width: 100,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        backgroundColor: '#99ccff'
    }
});

export default class SidebarMenu extends Component {
  
    constructor() {
        super();
       
      
   
        this.items = [
            {
                navOptionName: 'Scan QR',
                screenToNavigate: 'QRStack',
            },
            {
                navOptionName: 'Wallet',
                screenToNavigate: 'WalletStack',
            },
            {
                navOptionName: 'Profile',
                screenToNavigate: 'ProfileStack',
            }
        ];
    }

    // logout function
    logout = () => {
      this.props.navigation.navigate('Login');
    }

    render() {
      const {navigation} = this.props;
        return(
          <View style={styles.sideMenuContainer}>
              {/*Setting up Navigation Options from option array using loop*/}
              <View style={{ width: '100%' }}>
                {this.items.map((item, key) => (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingTop: 10,
                      paddingBottom: 10,
                      backgroundColor: global.currentScreenIndex === key ? '#e0dbdb' : '#ffffff',
                    }}
                    key={key}>
                    <Text
                      style={{
                        fontSize: 15,
                        color: global.currentScreenIndex === key ? 'red' : 'black',
                      }}
                      onPress={() => {
                        global.currentScreenIndex = key;
                        this.props.navigation.navigate(item.screenToNavigate);
                      }}>
                      {item.navOptionName}
                    </Text>
                  </View>
                ))}
              </View>
              <View>
                <TouchableOpacity style={styles.button} onPress={this.logout}>
                  <Text>Logout</Text>
                </TouchableOpacity>
              </View>
          </View>
        )
    }
}
