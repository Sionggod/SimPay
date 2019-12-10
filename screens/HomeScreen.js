/* // Start of Default App
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow


import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Step One</Text>
              <Text style={styles.sectionDescription}>
                Edit <Text style={styles.highlight}>App.js</Text> to change this
                screen and then come back to see your edits.
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>See Your Changes</Text>
              <Text style={styles.sectionDescription}>
                <ReloadInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Debug</Text>
              <Text style={styles.sectionDescription}>
                <DebugInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Learn More</Text>
              <Text style={styles.sectionDescription}>
                Read the docs to discover what to do next:
              </Text>
            </View>
            <LearnMoreLinks />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;

// End of Default App
*/

import React, { Component } from 'react';
import { Alert, StyleSheet, TextInput, Text, View, Image, Button, ScrollView } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    input: {
        width: 200,
        height: 45,
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15
    },
    logo: {
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
    }
    });

export default class HomeScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
        };
    }

    onLogin() {
        const {email, password} = this.state;
        Alert.alert('Credentials', `Username = ${email}\nPassword = ${password}`);
    }

    render() {
        return (
            <View style={styles.container}>
                <Image
                source={require('./images/credit-card.png')}
                style={styles.logo} />
                <Text style={{fontSize: 28, marginBottom: 25}}>WELCOME</Text>
                <TextInput
                value={this.state.email}
                onChangeText={(email)=>this.setState({email})}
                placeholder={'Email'}
                style={styles.input} />
                <TextInput
                value={this.state.password}
                onChangeText={(password)=>this.setState({password})}
                placeholder={'Password'}
                secureTextEntry={true}
                style={styles.input} />
                <Text style={styles.forget} >Forget Password?</Text>
                <Button
                title={'Login'}
                style={styles.input}
                onPress={this.onLogin.bind(this)} />
                <Text style={styles.loginFooter} >Don't have an account yet?</Text>
                <Text style={styles.loginFooter, {color: 'blue', textDecorationLine: 'underline'}} >Create new account</Text>
            </View>
        );
    }
}
