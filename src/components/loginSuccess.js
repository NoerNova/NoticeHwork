import React, { Component } from 'react';

import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  Alert
} from 'react-native';

import * as firebase from 'firebase';

import firebaseConfig from './firebaseConfig.js';
import { Actions } from 'react-native-router-flux';


class LoginSuccess extends Component {

logOut = () => {
  firebase.auth().signOut().then(function() {
    Alert.alert("Sign-Out","Successful");
    Actions.login();
  }).catch(function(error) {
    Alert.alert("Error");
});
}

  render(){
    return(
      <View style={styles.view}>
        <Text style={styles.text}>Login Successful</Text>
        <View>
          <TouchableHighlight style={styles.logoutButton} onPress={this.logOut}>
            <Text style={{padding: 10}}>Log Out</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  text:{
    fontSize: 30
  },
  view:{
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 200
  },
  logoutButton:{
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.3)',
  }
})
export default LoginSuccess;
