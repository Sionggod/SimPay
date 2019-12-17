import React, { Component } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class QRScanner extends Component {
   state = {
    hasCameraPermission: null,
    scanned: false,
  };

  async componentDidMount() {
    this.getPermissionsAsync();
  }

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  };

  render() {
    const { hasCameraPermission, scanned } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
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
    this.setState({ scanned: true });
    // array of merchants
    var MerchantList = ["MerchantID_1", "MerchantID_2", "MerchantID_3", "MerchantID_4"];

    // checks if QR Code data read is in merchant list
    if (MerchantList.includes(`${data}`) == true)
    {
        this.props.navigation.navigate('Payment', {merchantID: `${data}`});
        this.setState({ scanned: false });
    }
  };
}
