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
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

const data = [
  {
    imageUrl: "data:image/png;base64,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", //Green / Yellow / Red
    title: "Financial health",
    value: "Good" //Available value: "Good", "Okay", "Bad"
  },
  {
    imageUrl: "http://via.placeholder.com/160x160", //Pie chart
    title: "Spending this month",
    value : 1000 // Replace with calculation from current month
  },
  {
    imageUrl: "http://via.placeholder.com/160x160", //stacked chart
    title: "Current balance",
    value: 0 // Replace with current balance
  },
  {
    imageUrl: "http://via.placeholder.com/160x160", // Image
    title: "Monthly bills",
    value: 3000 //Replace with value from database
  },
  {
    imageUrl: "http://via.placeholder.com/160x160", //Image
    title: "Days to tax filing",
    value: 132 //Replace with value from database
  },
  {
    imageUrl: "http://via.placeholder.com/160x160", // Image
    title: "Average monthly spending",
    value: 1000, //Replace with value from database
  }
  ,
  {
    imageUrl: "http://via.placeholder.com/160x160", //Line chart
    title: "Saving/Investment",
    value: 500, //Replace with value from database
  }
];

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
      token: this.props.navigation.getParam('token', ''),
      user: this.props.navigation.getParam('name', ''),
      balance : [],
      transaction : [],
      data: data,
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
              .catch((error) => {console.log("@@@"+error)})
              .finally(
                this.setState({isLoading : false})
              );
  }

  async componentDidMount() {
    baseHeader =  {'Authorization': 'DirectLogin token="'+ this.state.token +'"'}
    //Assign the promise unresolved first then get the data using the json method. 
    await axios.get(this.constants.baseURL + this.constants.accHeld,
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
          })
        }
    })
    .catch((error) => {
      console.log("HERE#")
      console.log(error);
    })
  }

  render() {
    //console.log(this.state.token);
    if (this.state.isLoading){
      
      return <ActivityIndicator />;
    }else{
      console.log("#V")
      //console.log(this.state.transaction[0])
      sum = 0
      cur = ''
      for (ind = 0; ind <this.state.balance.length; ind++){
        
        sum+=Number(this.state.balance[ind].amount)
        cur=this.state.balance[ind].currency
      }
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
                    <Card style={{height: 300}}
                      title={rowData.title}
                      titleNumberOfLines={2}
                      titleStyle={{ fontSize: 11, }}
                      image={{ uri: rowData.imageUrl, }}
                      containerStyle={{ padding: 0, width: 160, }}
                    >
                      <Text style={{ marginBottom: 0 }}>
                        {rowData.value}
                      </Text>
                    </Card>
                    );
                  }}
                  keyExtractor={(item, index) => index}
                />
            </View>

          
          
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View style={styles.getStartedContainer}>
              {this._maybeRenderDevelopmentModeWarning()}
              
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
          
          <View style={styles.tabBarInfoContainer}>
            <Text style={styles.tabBarInfoText}>This is a tab bar. You can edit it in:</Text>
  
            <View style={[styles.codeHighlightContainer, styles.navigationFilename]}>
              <MonoText style={styles.codeHighlightText}>navigation/MainTabNavigator.js</MonoText>
            </View>
          </View>
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
