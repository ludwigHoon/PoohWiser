import * as React from 'react';
import { Text, Overlay, Modal, View, Image, Dimensions, StyleSheet, Button } from 'react-native';
import { Dialog } from "react-native-simple-dialogs";
import { createStackNavigator,} from 'react-navigation';
import { BarCodeScanner, Permissions } from 'expo';
import { ScrollView } from 'react-native-gesture-handler';
import PayScreen from '../screens/PayScreen';
const PayStack = createStackNavigator({
    Pay: PayScreen,
  });
//API for generating qr code -  supply account ID to data
//https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Example

const { height, width } = Dimensions.get('window');

export default class LinksScreen extends React.Component {
  state = {
    hasCameraPermission: null,
    scanned: false,
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
          style={{width:width -50, height: width-50,}}
        />
        <Dialog
                    title="Custom Dialog"
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
                    <Text style={ { marginVertical: 30 } }>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </Text>
                    <Button
                        onPress={ () => {this.setState({'scanned': false}); } }
                        style={ { marginTop: 10 } }
                        title="CLOSE"
                    />
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
    this.setState({ scanned: true });
    console.log(data);
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

