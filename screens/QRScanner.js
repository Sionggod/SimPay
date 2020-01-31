import React, { Component } from 'react';
import { Text, View, StyleSheet, Button, Alert } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class QRScanner extends Component {

  constructor(props) {
    super(props);
    const {navigation} = this.props;
    this.state = {
      hasCameraPermission: null,
      scanned: false,
      cameraState: null,
      email: null
    };
    this.state.email=(navigation.getParam('email'));
  }
  async componentDidMount() {
    this.props.navigation.addListener('willFocus', ()=> {
      this.getPermissionsAsync();
      this.state.cameraState = true;
      this.state.scanned = false;
    });
  }

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  };

  render() {
    const { hasCameraPermission, scanned, cameraState } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }

    if (cameraState === null || cameraState === false) {
      return null;
    }

    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />

        {scanned && (
          <Button title={'Tap to Scan Again'} onPress={() => this.setState({ scanned: false })} />
        )}
      </View>
    );
  }

  /*Upon successful scanning, redirect client to whereever you want from here*/
  handleBarCodeScanned = ({ type, data }) => {
    // prompts user to scan again 
    this.setState({ scanned: true });

    // array of merchants
    var MerchantList = ["MerchantID_1", "MerchantID_2", "MerchantID_3", "MerchantID_4","MerchantID_5"];

    // checks if QR Code data read is in merchant list
    if (MerchantList.includes(`${data}`) == true)
    {
      this.setState({ cameraState: false });
      this.props.navigation.navigate('Payment',{merchantID: `${data}`,email: this.state.email});
    }
  };
}
