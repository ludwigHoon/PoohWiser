import * as React from 'react';
import { Alert, Text, TextInput, View, Image, Dimensions, KeyboardAvoidingView, StyleSheet, Button } from 'react-native';
import { Dialog } from "react-native-simple-dialogs";
import { BarCodeScanner, Permissions } from 'expo';
import { ScrollView } from 'react-native-gesture-handler';

//API for generating qr code -  supply account ID to data
//https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Example

const { height, width } = Dimensions.get('window');

export default class LinksScreen extends React.Component {
  state = {
    hasCameraPermission: null,
    scanned: false,
    payAmount: 0,
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    //await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  render() {
    const { hasCameraPermission, scanned } = this.state;
    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }

    return (
      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <View style={{alignItems: 'center',}}>
        <Text style={styles.txt} style={{fontSize:30, }}>Payment</Text>
        
        </View>
        <ScrollView ref={(scrollView) => { this.scrollView = scrollView; }}
        style={styles.container}
        horizontal= {true}
        decelerationRate={0}
        snapToInterval={width}
        snapToAlignment={"center"}
        contentInset={{
          top: 0,
          left: 30,
          bottom: 0,
          right: 30,
        }}>
        <View style={styles.view2}>
        <Text style={styles.txt}> Scan to pay</Text>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={{width:width -60, height: width-60,}}
        />
        <Dialog
                    title="Payment amount"
                    animationType="fade"
                    contentStyle={
                        {
                            alignItems: "center",
                            justifyContent: "center",
                        }
                    }
                    onTouchOutside={ () => {this.setState({'scanned': false});} }
                    visible={ scanned }
                >
                  <KeyboardAvoidingView behavior="padding">
                    <Text style={ { marginVertical: 30 } }>
                        Enter the amount to pay to <Text style={{fontWeight: 'bold'}}>{this.state.scan}{'\n\n'}MYR</Text>
                    </Text>
                    <TextInput 
                            autoCorrect={false} 
                            keyboardType='number-pad' 
                            returnKeyType="next" 
                            placeholder='0'
                            value={this.state.payAmount}
                            onChangeText={(payAmount) => this.setState({ payAmount })}/>
                    <Text>
                    {"\n"}
                    </Text>                    
                    <Button
                        onPress={ () => {this.setState({'scanned': false}); 
                        Alert.alert('Notifications', `Paid ${this.state.payAmount} MYR to ${this.state.scan}`);
                        this.setState({'payAmount': 0});
                        this.props.navigation.navigate("Home", {'token' : this.state.token, 'name': this.state.email}) } }
                        style={ { marginTop: 10, 'height': 50, 'width':100 } }
                        color='green'
                        title="Confirm"
                    />
                    <Text>
                    {"\n"}
                    </Text>
                    <Button
                        onPress={ () => {this.setState({'scanned': false, 'payAmount': 0}); } }
                        style={ { marginTop: 10, 'height': 50, 'width':100 } }
                        title="CLOSE"
                    />
                    </KeyboardAvoidingView>
                </Dialog>

        
        </View>
        <View style={styles.view2}>
        <Text style={styles.txt}>Receive</Text>
        <Image
          source={{uri:`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Example`}}
          style={{width:width -10, height: width-10, resizeMode: 'contain'}}
          />  
        </View>
        </ScrollView>
      </View>
    );
  }

  handleBarCodeScanned = ({ type, data }) => {
    this.setState({'scan': data});
    console.log(data);
    this.setState({ scanned: true });
    //console.log(this.props.navigation)
    //this.props.navigation.navigate("Pay", {'token' : this.state.token, 'name': this.state.email})
    //alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

}

const styles = StyleSheet.create({
  container: {},
  view2: {
    marginTop: 50,
    marginBottom: 20,
    marginLeft: 5,
    backgroundColor: 'white',
    width: width,
    margin: 0,
    height: height - 230,
    borderRadius: 0,
    alignItems: 'center',
    //justifyContent: 'center',
    //paddingHorizontal : 30
  },
  txt: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  }
});

/*
<Image
                        source={
                            {
                                uri: "https://facebook.github.io/react-native/img/header_logo.png",
                            }
                        }
                        style={
                            {
                                width: 99,
                                height: 87,
                                backgroundColor: "black",
                                marginTop: 10,
                                resizeMode: "contain",
                            }
                        }
                    />
*/