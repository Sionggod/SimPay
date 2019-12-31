import React, { Component } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { createAppContainer, createSwitchNavigator} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

// import SwitchNavigation pages
import LoginPage from './screens/LoginPage';
import RegistrationPage from './screens/RegistrationPage';
import MainMenu from './screens/MainMenu.js';
import QRScanner from './screens/QRScanner.js';
import PaymentPage from './screens/PaymentPage.js';
import CheckPayment from './screens/CheckPayment.js';

// import WalletStackNavigation pages
import WalletOverview from './screens/WalletOverview.js';
import AddCardToWallet from './screens/AddCardToWallet.js';

// import ProfileStackNavigation pages
import ProfilePage from './screens/ProfilePage.js';

// import custom sidebar for drawer navigation
import SidebarMenu from './screens/SidebarMenu.js';
/*
// declare and initialise firebase
var firebase = require("firebase");

var config = {
    databaseURL: "https://simpay-8bc6c.firebaseio.com",
    projectId: "simpay-8bc6c"
};

firebase.initializeApp(config);
*/

global.currentScreenIndex = 0;

class NavigationDrawerStructure extends Component {
    toggleDrawer = () => {
        this.props.navigationProps.toggleDrawer();
    };
    render() {
        return(
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
                  <Image
                    source={require('./assets/images/drawer.png')}
                    style={{ width: 25, height: 25, marginLeft: 5 }}
                  />
                </TouchableOpacity>
            </View>
        );
    }
}

// wallet stack navigation
const WalletStackNavigation = createStackNavigator(
    {
        WalletMain:
        {
            screen: WalletOverview,
            navigationOptions: ({ navigation }) => ({
                headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
                headerTitle: 'Wallet',
            })
        },
        AddCard:
        {
            screen: AddCardToWallet,
            navigationOptions:
            {
                headerTitle: 'Add a new card',
            },
        }
    }
);

// profile stack navigation
const ProfileStackNavigation = createStackNavigator(
    {
        ProfileMain:
        {
            screen: ProfilePage,
            navigationOptions: ({ navigation }) => ({
                headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
            })
        },
    },
);

// QR stack navigation
const QRStackNavigation = createStackNavigator(
    {
        QRMain:
        {
            screen: MainMenu,
            navigationOptions: ({ navigation }) => ({
                headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
            })
        },
        QRScan:
        {
            screen: QRScanner,
            navigationOptions:
            {
                headerTitle: 'Scan QR Code',
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
        initialRouteName: 'QRMain',
    }
);

// drawer navigation
const DrawerNavigation = createDrawerNavigator(
    {
        QRStack:
        {
            screen: QRStackNavigation,
        },
        WalletStack:
        {
            screen: WalletStackNavigation,
        },
        ProfileStack:
        {
            screen: ProfileStackNavigation,
        },
    },
    {
        // for custom SidebarMenu
        contentComponent: SidebarMenu,
    }
);

// switch navigation
const SwitchNavigation = createSwitchNavigator(
    {
        Login: { screen: LoginPage },
        Registration: { screen: RegistrationPage },
        Landing: { screen: DrawerNavigation },
    },
    {
        // starting route
        initialRouteName: 'Login',
    }
);

export default createAppContainer(SwitchNavigation);
