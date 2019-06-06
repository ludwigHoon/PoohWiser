import * as React from 'react';
import { Text, View, Image, Dimensions, StyleSheet, Button } from 'react-native';

import { BarCodeScanner, Permissions } from 'expo';
import { ScrollView } from 'react-native-gesture-handler';
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
          style={{width:width -10, height: width-10}}
        />
        {scanned && (
          <Button style={{position: 'absolute', bottom: 10}} title={'Tap to Scan Again'} onPress={() => this.setState({ scanned: false })} />
        )}
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
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
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

