import React from 'react';
import axios from 'axios';

import { Card } from "react-native-elements";
//https://streetsmartdev.com/create-horizontal-list-react-native/

import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  View,
  FlatList,
  AsyncStorage, 
} from 'react-native';
import { WebBrowser } from 'expo';
import { fdata1, fdata2 } from '../constants/data';

import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props){
    super(props);
    this.constants = {
      baseURL : 'https://openlab.openbankproject.com',
      accHeld : '/obp/v3.1.0/banks/hsbc.02.hk.hsbc/accounts-held',
      acc :'/obp/v3.1.0/banks/hsbc.02.hk.hsbc/accounts/',
      balance : '/owner/account',
      transact : '/owner/transactions',
    };
    this.state ={ isLoading: true, 
      ftime: this.props.navigation.getParam('ftime', false),
      token: this.props.navigation.getParam('token', ''),
      user: this.props.navigation.getParam('name', ''),
      balance : [],
      transaction : [],
      data: [],
      balance_deduct : 0,
      }
  }

  processTransact(transactions){
    arrayTransact = []
    for (var ind = 0; ind < transactions.length; ind++){
      temp = (({ description, completed, value, new_balance }) => ({ description, completed, value, new_balance }))(transactions[ind].details);
      temp['value'] = temp['value'].amount + '' + temp['value'].currency
      temp['new_balance'] = temp['new_balance'].amount + '' + temp['new_balance'].currency 
      arrayTransact.push(temp)
    }
    return (arrayTransact);
  }

  async getTransact(header){
    await axios.get(this.constants.baseURL + this.constants.acc + account.id +this.constants.transact, 
      {headers : header})
              .then((response) => {
                transaction = this.processTransact(response.data.transactions)
                this.setState({'transaction' : [...this.state.transaction, transaction]})
                this.UNSAFE_componentWillMount})
              .catch((error) => {
                console.log("@@@"+error);
                transactions = fdata1.transaction
                this.setState({'transaction' : [...this.state.transaction, transactions]})
            })
              .finally(
                this.setState({isLoading : false})
              );
  }

  async componentDidMount() {
    console.log('mount')
    AsyncStorage.clear()
    //API Calls
    baseHeader =  {'Authorization': 'DirectLogin token="'+ this.state.token +'"'}
    //Assign the promise unresolved first then get the data using the json method. 
    /*
    axios.get(this.constants.baseURL + this.constants.accHeld,
       {headers : baseHeader},).then((response) =>{
        accounts = response.data.accounts;
        for (var ind = 0; ind < (accounts.length); ind++){
          account = accounts[ind]
          axios.get(this.constants.baseURL + this.constants.acc + accounts[ind].id + this.constants.balance, 
            {headers: baseHeader})
          .then((response)=>{
            this.setState({'balance': [...this.state.balance, response.data.balance]})
            header = baseHeader
            header['limit'] = '100';
            header['to_date'] = new Date().toISOString();
            this.getTransact(header);
          }).catch((error) => {
            console.log(error);
            this.setState({'balance': fdata1.balance})
            transactions = fdata1.transaction
            this.setState({'transaction' : [...this.state.transaction, transactions]})
          })
        }
    })
    .catch((error) => {
      console.log("HERE#")
      console.log(error);
    }).finally(
      this.setState({'isLoading': false})
    )
    */
   //Using custom data:
   if(this.props.navigation.getParam('ftime', false)){
    if(this.state.user == 'Eleanor.Hk.02'){
      this.setState({'data': fdata1.data})
      this.setState({'balance': fdata1.balance})
      this.setState({'transaction' : [...this.state.transaction, fdata1.transaction]})
    }else{
      this.setState({'data': fdata2.data})
      this.setState({'balance': fdata2.balance})
      this.setState({'transaction' : [...this.state.transaction, fdata2.transaction]})
    }
    
   }else{
   }
    this.setState({isLoading:false})
  }

  async _updateData(){
    console.log('re')
    try{
    await AsyncStorage.getItem("newTransact").then((value) => {tranction = JSON.parse(value)});
    if(tranction == null){
      return
    }
    this.setState({'transaction': [...this.state.transaction,tranction]});
    await AsyncStorage.removeItem("newTransact")
    ded = (this.state.balance_deduct + Number(tranction[0].value))
    await this.setState({'balance_deduct': ded})
    }
    catch(error){
      console.log(error);
    }
  }

  render() {
    if (this.state.isLoading){
      
      return <ActivityIndicator />;
    }else{
      this._updateData()
      //console.log(this.state.transaction[0])
      sum = 0
      cur = ''
      for (ind = 0; ind <this.state.balance.length; ind++){
        sum+=Number(this.state.balance[ind].amount)
        cur=this.state.balance[ind].currency
      }
      sum = sum - this.state.balance_deduct;
      sum = sum + ' ' + cur;
      return (
        <View style={styles.container}>
          
          <View style={{flexDirection: 'row', marginTop: 35, marginBottom: 0, paddingBottom: 5}}>
          
        
            <Image
                    source={ require('../assets/images/pwiser.png')}
                    style={styles.welcomeImage}
                    />  
              <Text style={styles.getStartedText}>
                Hello {this.state.user}</Text>
            
          </View>

            <View style={{flexDirection: 'column', marginTop: 0, paddingStart: 0}}>
              <FlatList
                horizontal
                data={this.state.data}
                renderItem={({ item: rowData }) => {
                  return (
                    <Card 
                      title={rowData.title}
                      titleNumberOfLines={2}
                      titleStyle={{ fontSize: 11, }}
                      image={{ uri: rowData.imageUrl, }}
                      imageStyle={{height: 249, width: 249, justifyContent: 'center',}}
                      containerStyle={{ padding: 0, height: 350, width: 250, alignItems: 'center',}}
                    >
                      <Text style={{ marginBottom: 0 }}>
                        {rowData.value}
                      </Text>
                    </Card>
                    );
                  }}
                  keyExtractor={(item, index) => `${index}`}
                />
            </View>

          
          
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View style={styles.getStartedContainer}>
              
              <Text style={styles.getStartedText}>Current balance: {sum}</Text>
              <Text style={styles.getStartedText}>{this.state.token}</Text>
              <View style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
                <MonoText style={styles.codeHighlightText}>screens/HomeScreen.js</MonoText>
              </View>
              <Text style={styles.getStartedText}>
                Change this text and your app will automatically reload.
              </Text>
              <Text style={styles.getStartedText}>
                Change this text and your app will automatically reload.
              </Text>
              <Text style={styles.getStartedText}>
                Change this text and your app will automatically reload.
              </Text>
            </View>
  
            <View style={styles.helpContainer}>
              <TouchableOpacity onPress={this._handleHelpPress} style={styles.helpLink}>
                <Text style={styles.helpLinkText}>Help, it didn’t automatically reload!</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
          
        </View>
    );
    }
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'flex-start',
    marginTop: 10,
    marginBottom: 10,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: -20,
    marginLeft: 5,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'left',
    marginLeft: 20,
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
