import React, { Component } from 'react';
import {
  Platform,
  View,
  Image,
  StyleSheet,
  Alert,
  TouchableHighlight,
  Text,
  TextInput,
  ScrollView,
  ActivityIndicator
} from 'react-native';

import styles from '../styles/resetPasswordStyle.js';
import * as firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import firebaseConfig from './firebaseConfig.js';
import App from '../../App.js';
import Login from './login.js';

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
        email: '',
        animating: false
      }
  }

  resetPassword = () => {
    this.setState({ animating: true })
    setTimeout(() => { this.setState({ animating: false })}, 3000);
    var auth = firebase.auth();
    var emailAddress = this.state.email;

    auth.sendPasswordResetEmail(emailAddress).then(function() {
      Alert.alert('ResetPassword email has sent, \n Please check.');
      Actions.login();
    }, function(error) {
      Alert.alert('Error');
    });
  }


render() {
  return (
      <Image source={require('../img/blr_login.jpg')} style={styles.backgroundImg} >
        <Image source={require('../img/logo2.png')} style={styles.logo} />
        <Text style={styles.infoHead}>Forgot your Password?</Text>
        <Text style={styles.info}>Enter your email and the link to get back into your account will sent.</Text>
        <TextInput underlineColorAndroid = 'transparent'
          placeholder = "Email: "
          placeholderTextColor= '#aaaaaa'
          keyboardType='email-address'
          style={styles.inputStyle}
          onChangeText={(email) => {this.state.email = (email)}}
        />
        <TouchableHighlight style={styles.sendReset} onPress={this.resetPassword} underlayColor='#8f88fc'>
          <Text style={styles.textButtonStyle}>Send Reset Link</Text>
        </TouchableHighlight>
        <View style={{
          flexDirection:'row',
          marginTop: 50,
          alignItems: 'center',
        }}>
          <View
             style={{
               borderBottomWidth: 1,
               borderBottomColor: 'rgba(0, 0, 0, 0.8)',
               width: 50,
               marginRight: 10,
               marginTop: 2
             }}
           />
           <Text style={{backgroundColor: 'transparent'}}>OR</Text>
           <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: 'rgba(0, 0, 0, 0.8)',
                width: 50,
                marginLeft: 10,
                marginTop: 2
              }}
            />
       </View>
       <View style={{
         flexDirection: Platform.OS === 'ios' ? 'row' : 'column',
         marginTop: Platform.OS === 'ios' ? 40 : 20,
       }}>
         <TouchableHighlight onPress={Login.fblogin}
           underlayColor="transparent"
           style={{
             marginTop: Platform.OS === 'ios' ? 0 : 10
           }}>
           <Text style={{color:'#308db2'}}>Login with facebook</Text>
         </TouchableHighlight>

         <TouchableHighlight onPress={Login.gglogin}
           underlayColor="transparent"
           style={{
             marginTop: Platform.OS === 'ios' ? 0 : 20,
             marginLeft: Platform.OS === 'ios' ? 20 : 10
           }}>
           <Text style={{color:'#308db2'}}>Login with google</Text>
         </TouchableHighlight>
       </View>

       <TouchableHighlight onPress={() => Actions.login()} underlayColor="transparent">
        <Text style={{
          fontSize: 20,
          color: '#ffffff',
          marginTop: 20
        }}>back</Text>
       </TouchableHighlight>
       <View style={{position: 'absolute', justifyContent: 'center', alignItems: 'center'}}>
       {this.state.animating && <Text></Text>}
         <ActivityIndicator
                  animating = {this.state.animating}
                  color = 'black'
                  size = "large"
                  style = {{flex: 1,
                           justifyContent: 'center',
                           alignItems: 'center',
                           height: 80,
                           position: 'absolute'
                         }}
         />
      </View>
      </Image>
  );
}
};

export default ResetPassword;
