//import liraries
import React, { Component } from 'react';
import { View, Button, Text, Image, StyleSheet,KeyboardAvoidingView } from 'react-native';
import { createStackNavigator, NavigationEvents } from 'react-navigation';
import LoginForm from './LoginForm';
import HomeScreen from '../screens/HomeScreen';
const HomeStack = createStackNavigator({
    Home: HomeScreen,
  });
// create a component
export default class LoginScreen extends React.Component {
    static navigationOptions = {
        header: null,
      };
    
      constructor(props){
        super(props);
        console.info(this.props);
      }

    render() {
        //<Image resizeMode="contain" style={styles.logo} source={require('../../components/images/logo-dark-bg.png')} />
        return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>

                <View style={styles.loginContainer}>

                    </View>
               <View style={styles.formContainer}>
                   <LoginForm state={this.state} navigation={this.props.navigation}/>
               </View>
               
         
            </KeyboardAvoidingView>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2c3e50',
    },
    loginContainer:{
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    logo: {
        position: 'absolute',
        width: 300,
        height: 100
    },
    title:{
        color: "#FFF",
        marginTop: 120,
        width: 180,
        textAlign: 'center',
        opacity: 0.9
    }
});