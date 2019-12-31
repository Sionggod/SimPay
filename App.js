import React, { Component } from 'react';
import { createAppContainer, createSwitchNavigator} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import firebase from 'firebase';


// import pages
import LoginPage from './screens/LoginPage';
import RegistrationPage from './screens/RegistrationPage';
import MainMenu from './screens/MainMenu.js';
import QRScanner from './screens/QRScanner.js';
import PaymentPage from './screens/PaymentPage.js';
import CheckPayment from './screens/CheckPayment.js';
import InputPage from './screens/InputPage.js';
/*
// declare and initialise firebase
var firebase = require("firebase");

var config = {
    databaseURL: "https://simpay-8bc6c.firebaseio.com",
    projectId: "simpay-8bc6c"
};

firebase.initializeApp(config);
*/
// stack navigation
const StackNavigation = createStackNavigator(
    {
        Main: { screen: MainMenu },
        QRScan:
        {
            screen: QRScanner,
            navigationOptions:
            {
                headerTitle: 'Scan QR Code',
            },
        },
        AddCard:
        {
            screen: InputPage,
            navigationOptions:
            {
                headerTitle: 'Input Card Details',
            },
        },
        Payment:
        {
            screen: PaymentPage,
            navigationOptions:
            {
                headerTitle: 'Payment Details',
            },
        },
        ConfirmPayment:
        {
            screen: CheckPayment,
            navigationOptions:
            {
                headerTitle: 'Confirm Payment Details',
            },
        },
    },
    {
        // starting route
        initialRouteName: 'Main',
    }
);

// switch navigation
const SwitchNavigation = createSwitchNavigator(
    {
        Login: { screen: LoginPage },
        Registration: { screen: RegistrationPage },
        Landing: { screen: StackNavigation },
    },
    {
        // starting route
        initialRouteName: 'Login',
    }
);

export default createAppContainer(SwitchNavigation);
