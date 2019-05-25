import React from 'react';
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';
import LoginScreen from '../screens/LoginScreen';
import MainTabNavigator from './MainTabNavigator';
import LoginForm from '../screens/LoginForm';

const AuthStack = createStackNavigator({ SignIn: LoginScreen, form : LoginForm });

export default createAppContainer(createSwitchNavigator(
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  {
    App: MainTabNavigator,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'Auth',
  }
));