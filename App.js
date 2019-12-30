import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer, createSwitchNavigator} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import InputPage from './screens/InputPage.js';

const StackNavigation = createStackNavigator(
  {
      Main: { screen: InputPage }
  },
  {
      // starting route
      initialRouteName: 'Main',
  }
);



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const SwitchNavigation = createSwitchNavigator(
  {
      Login: { screen: InputPage },
  },
  {
      // starting route
      initialRouteName: 'Login',
  }
);
export default createAppContainer(SwitchNavigation);