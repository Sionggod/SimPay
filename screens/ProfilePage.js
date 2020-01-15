import React, { Component } from 'react';
import { Animated, StatusBar, Alert, StyleSheet, TextInput, Text, View, Image, Button,TouchableOpacity } from 'react-native';
import firebase from 'firebase';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: 'white',
        width: 375,
        height: 45,
        padding: 24,
        marginBottom: 15
    },
    header: {
        fontWeight:'bold',
        fontSize:28,
        alignSelf:'flex-start'
    },
    header2: {
        fontWeight:'bold',
        fontSize:20,
        alignSelf:'flex-start',
        backgroundColor:'#d3d3d3',
        width: 500
    },
    button: {
        width: 100,
        padding: 5,
        borderRadius: 5,
        alignItems: 'center',
        backgroundColor: '#99ccff',
        alignSelf:'flex-end'
    },
    TextBox:{
        height: 26,
        fontSize: 20,
        color: '#000',
        borderBottomWidth: 1,
        borderBottomColor: '#555'
    },
});

class FloatingLabelInput extends Component {
    state = {
        isFocused: false,
    };

    componentWillMount() {
      this._animatedIsFocused = new Animated.Value(this.props.value === '' ? 0 : 1);
    }


    handleFocus = () => this.setState({ isFocused: true });
    handleBlur = () => this.setState({ isFocused: false });

    componentDidUpdate() {
      Animated.timing(this._animatedIsFocused, {
        toValue: (this.state.isFocused || this.props.value !== '') ? 1 : 0,
        duration: 200,
    }).start();
    }

    render() {
        const { label, ...props } = this.props;
        const { isFocused } = this.state;
        const labelStyle = {
          position: 'absolute',
          left: 0,
          top: this._animatedIsFocused.interpolate({
            inputRange: [0, 1],
            outputRange: [18, 0],
          }),
          fontSize: this._animatedIsFocused.interpolate({
            inputRange: [0, 1],
            outputRange: [20, 14],
          }),
          color: this._animatedIsFocused.interpolate({
            inputRange: [0, 1],
            outputRange: ['#aaa', '#000'],
          }),
        };
    return (
        <View style = {{paddingTop: 18}}>
             <Animated.Text style = {labelStyle}>
                {label}
             </Animated.Text>
             <TextInput {...props} style = {styles.TextBox} onFocus={this.handleFocus} onBlur={this.handleBlur} blurOnSubmit/>
        </View>
        );
    }
}
export default class ProfilePage extends Component {
    constructor(props) {
        super(props);
        const {navigation} = this.props;
        this.state = {
            email: null,
            phone: null,
            value: '',
            nameText: '',
            emailText: '',
            phoneText: '',

        };
        handleTextChange = (newText) => this.setState({ value:newText});
        this.state.email=(navigation.getParam('email'));
    }
    render() {
        return(
            <View style={styles.container}>
                <Text style ={styles.header}>Profile Details </Text>
                <Text style = {styles.header2}>Name: </Text>
                <StatusBar hidden/>
                <FloatingLabelInput label = "Bryan Cheng" value ={this.state.nameText} onChangeText={(nameText)=>this.setState({nameText})} />
                <Text style = {styles.header2}>Email: </Text>
                <FloatingLabelInput label = {this.state.email} value ={this.state.emailText} onChangeText={(emailText)=>this.setState({emailText})} />
                <Text style = {styles.header2}>Mobile Number:</Text>
                <FloatingLabelInput label = {this.state.phone} value ={this.state.phoneText} onChangeText={(phoneText)=>this.setState({phoneText})} />
                <TouchableOpacity style={styles.button}>
                    <Text>Edit Details</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

