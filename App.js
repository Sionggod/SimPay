import React, { Component } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { createAppContainer, createSwitchNavigator} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

// import SwitchNavigation pages
import LoginPage from './screens/LoginPage.js';
import RegistrationPage from './screens/RegistrationPage.js';
import ForgotPassword from './screens/ForgotPassword.js'

// import QRStackNavigation pages
import MainMenu from './screens/MainMenu.js';
import QRScanner from './screens/QRScanner.js';
import PaymentPage from './screens/PaymentPage.js';
import CheckPayment from './screens/CheckPayment.js';
import ReceiptPage from './screens/ReceiptPage.js';
import AddCardPayment from './screens/AddCardForPayment.js';

// import WalletStackNavigation pages
import WalletOverview from './screens/WalletOverview.js';
import AddCardToWallet from './screens/AddCardToWallet.js';

// import ProfileStackNavigation pages
import ProfilePage from './screens/ProfilePage.js';
import AnalysisPage from './screens/AnalysisPage.js';

//import TransactionNavigation page
import TransactionPage from './screens/TransactionPage.js'

// import custom sidebar for drawer navigation
import SidebarMenu from './screens/SidebarMenu.js';


const styles = {
    header: {
        backgroundColor: '#4FC3F7',
      },
      headerTintColor: '#FFFFFF',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
};

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
                headerStyle: styles.header,
            })
        },
        AddCard:
        {
            screen: AddCardToWallet,
            navigationOptions:
            {
                headerTitle: 'Add a new card',
                headerStyle: styles.header,
            },
        }
    }
);

//profile transaction navigation
const StatisticNavigation = createStackNavigator(
    {
        Statistic:
        {
            screen: AnalysisPage,
            navigationOptions: ({ navigation }) => ({
              headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
              headerTitle: 'Budget',
              headerStyle: styles.header,
          })
        },
    },
  );

//profile transaction navigation
const TransactionNavigation = createStackNavigator(
  {
      Transaction:
      {
          screen: TransactionPage,
          navigationOptions: ({ navigation }) => ({
            headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
            headerTitle: 'Transactions',
            headerStyle: styles.header,
        })
      },
  },
);

// profile stack navigation
const ProfileStackNavigation = createStackNavigator(
    {
        ProfileMain:
        {
            screen: ProfilePage,
            navigationOptions: ({ navigation }) => ({
                headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
                headerTitle: 'Profile',
                headerStyle: styles.header,
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
                headerTitle: 'Qr Code Scanner',
                headerStyle: styles.header,
                
            })
        },
        QRScan:
        {
            screen: QRScanner,
            navigationOptions:
            {
                headerTitle: 'Scan QR Code',
                headerStyle: styles.header,
            },
        },
        Payment:
        {
            screen: PaymentPage,
            navigationOptions:
            {
                headerTitle: 'Payment Details',
                headerStyle: styles.header,
            },
        },
        ConfirmPayment:
        {
            screen: CheckPayment,
            navigationOptions:
            {
                headerTitle: 'Confirm Payment Details',
                headerStyle: styles.header,
            },
        },
        PaymentSummary:
        {
            screen: ReceiptPage,
            navigationOptions:
            {
                headerTitle: 'Payment Summary',
                headerStyle: styles.header,
            },

        },
        AddCardPayment:
        {
            screen: AddCardPayment,
            navigationOptions:
            {
                headerTitle: 'Add card Payment',
                headerStyle: styles.header,
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
            TransactionStack:
            {
                screen: TransactionNavigation,
            },
            StatisticStack:
            {
                screen: StatisticNavigation,
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
        Landing: { screen: DrawerNavigation},
        Forgot: { screen: ForgotPassword },
    },
    {
        // starting route
        initialRouteName: 'Login',
    }
);

export default createAppContainer(SwitchNavigation);