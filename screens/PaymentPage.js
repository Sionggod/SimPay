import React, { Component } from 'react';
import { Animated,Dimensions,Keyboard,UIManager,Alert, StyleSheet, TextInput, Text, View, Image, Button, KeyboardAvoidingView, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    input: {
        width: 200,
        height: 45,
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15
    },
    button: {
        width: 120,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        backgroundColor: '#99ccff',
    }
});
const { State: TextInputState } = TextInput;
export default class PaymentPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            amount: '',
            shift: new Animated.Value(0),
        }
    }

    componentWillMount() {
        this.keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', this.handleKeyboardDidShow);
        this.keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', this.handleKeyboardDidHide);
      }
    
      componentWillUnmount() {
        this.keyboardDidShowSub.remove();
        this.keyboardDidHideSub.remove();
      }

    render () {
        const { shift } = this.state;
        // get merchant ID from previous screen
        const merchantID = this.props.navigation.getParam('merchantID');
        return (
            <Animated.View style={[styles.container, { transform: [{translateY: shift}] }]}>
            <View style={styles.container}>
                <Text>Vendor Name:</Text>
                <Text>Merchant ID = {merchantID}</Text>
                <Text>Input amount (S$):</Text>
                <TextInput style={styles.input} returnKeyType='done' keyboardType={'numeric'} value={this.state.amount} onChangeText={(amount)=>this.setState({amount})} />
                <TouchableOpacity style={styles.button} onPress={()=>this.props.navigation.navigate('ConfirmPayment', {merchantID: merchantID, amountPayable: this.state.amount})}>
                    <Text>Next</Text>
                </TouchableOpacity>
            </View>
            </Animated.View>
        );
    }

    handleKeyboardDidShow = (event) => {
        const { height: windowHeight } = Dimensions.get('window');
        const keyboardHeight = event.endCoordinates.height;
        const currentlyFocusedField = TextInputState.currentlyFocusedField();
        UIManager.measure(currentlyFocusedField, (originX, originY, width, height, pageX, pageY) => {
          const fieldHeight = height;
          const fieldTop = pageY;
          const gap = (windowHeight - keyboardHeight) - (fieldTop + fieldHeight);
          if (gap >= 0) {
            return;
          }
          Animated.timing(
            this.state.shift,
            {
              toValue: gap,
              duration: 200,
              useNativeDriver: true,
            }
          ).start();
        });
      }
    
      handleKeyboardDidHide = () => {
        Animated.timing(
          this.state.shift,
          {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }
        ).start();
      }
}
