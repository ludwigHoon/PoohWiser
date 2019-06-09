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
        t1 = {'email': 'Chris.Hk.02', 'password': 'X!19dbee82'}
        t2 = {'email': 'Eleanor.Hk.02', 'password':'X!9c9893e7'}
        super(props);
        this.state = t2
    }

    async onButtonPress() {
        await axios.post('https://openlab.openbankproject.com/my/logins/direct', 
        '', {headers: {
            'Authorization': 'DirectLogin username="'+this.state.email+'",   password="'+this.state.password+'",  consumer_key="menzvlhllhpwbtxav5x1dtwxufczc1fcvlh4ss3v"',
            'Content-Type': 'application/json',
          },
        }).then((response) => {
            this.props.navigation.navigate("Home", {'token' : response.data.token, 'name': this.state.email, 'ftime': true})
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
                            placeholder='Email or User name'
                            value={this.state.email}
                            onChangeText={(email) => this.setState({ email })}
                            ref={input => { this.textInput = input }}
                            placeholderTextColor='rgba(225,225,225,0.7)'/>

                <TextInput style = {styles.input}   
                           returnKeyType="go" ref={(input)=> this.passwordInput = input} 
                           placeholder='Password' 
                           name='password'
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
