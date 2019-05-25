//import liraries
import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Button ,StyleSheet ,StatusBar} from 'react-native';
import axios from 'axios';

// create a component
export default class LoginForm extends Component {
    static navigationOptions = {
        header: null,
      };
    
    
    constructor(props){
        super(props);
        this.state = {'email': 'Eleanor.Hk.02', 'password':'X!9c9893e7'}
        //this.handleChange = this.handleInputChange.bind(this);
    }
/*
    handleInputChange(event = {}) {
        const name = event.target && event.target.name;
        const value = event.target && event.target.value;
      
        this.setState({[name]: value});
        console.log(name);
        console.log(value);
      }
*/
    onButtonPress() {
        console.log(this.state);
        console.log(this.state.email);
        console.log(this.state.password);
        axios.post('https://openlab.openbankproject.com/my/logins/direct', 
        '', {headers: {
            'Authorization': 'DirectLogin username="'+this.state.email+'",   password="'+this.state.password+'",  consumer_key="menzvlhllhpwbtxav5x1dtwxufczc1fcvlh4ss3v"',
            'Content-Type': 'application/json',
          },
        }).then((response) => {
            //this.setState({token: response.data.token});
            console.log(response.data.token);
            //super.props.navigation.navigate('App');
            //<MainTabNavigator />
            this.props.navigation.navigate("Home", {'token' : response.data.token})
          })
          .catch((error) => {console.log(error);Alert.alert('Wrong user name or password', alert); })
    };
 
    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content"/>
                <TextInput style = {styles.input}
                            autoCapitalize="none" 
                            onSubmitEditing={() => this.passwordInput.focus()} 
                            autoCorrect={false} 
                            keyboardType='email-address' 
                            returnKeyType="next" 
                            placeholder='Email or Mobile Num'
                            defaultValue='Eleanor.Hk.02'
                            value={this.state.email}
                            onChangeText={(email) => this.setState({ email })}
                            ref={input => { this.textInput = input }}
                            placeholderTextColor='rgba(225,225,225,0.7)'/>

                <TextInput style = {styles.input}   
                           returnKeyType="go" ref={(input)=> this.passwordInput = input} 
                           placeholder='Password' 
                           name='password'
                           defaultValue='X!9c9893e7'
                           onChange={this.handleInputChange}
                           value={this.state.password}
                           onChangeText={(password) => this.setState({ password })}
                           ref={input => { this.textInput = input }}
                           placeholderTextColor='rgba(225,225,225,0.7)' 
                           secureTextEntry/>
                 {/*   <Button onPress={onButtonPress} title = 'Login' style={styles.loginButton} /> */}
              <TouchableOpacity style={styles.buttonContainer} onPress={this.onButtonPress.bind(this)}>
                    <Text  style={styles.buttonText}>LOGIN</Text>
                </TouchableOpacity> 
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
     padding: 20
    },
    input:{
        height: 40,
        backgroundColor: 'rgba(225,225,225,0.2)',
        marginBottom: 10,
        padding: 10,
        color: '#fff'
    },
    buttonContainer:{
        backgroundColor: '#2980b6',
        paddingVertical: 15
    },
    buttonText:{
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700'
    }, 
    loginButton:{
      backgroundColor:  '#2980b6',
       color: '#fff'
    }
   
});
