import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  Alert
} from 'react-native';

import {
  AppLoading
} from 'expo';

import * as firebase from 'firebase';
import firebaseConfig from './firebaseConfig.js';

import { Actions } from 'react-native-router-flux';

class FirstPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      isReady: false,
      loggedIn: false,
    }
  }

  componentWillMount() {
    this._cacheResourcesAsync();
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={require('../img/logo2.png')} />
        <Image style={styles.loading} source={require('../img/icon/Loading_icon.gif')} />
      </View>
    );
  }

  async _cacheResourcesAsync() {
    setTimeout(() => {
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          const rootRef = firebase.database().ref();
          const course = rootRef.child('users/' + user.uid + '/courseList');
          course.once('value', snap => {
            if (snap.val() != null) {
              Actions.mainscreen();
            } else {
              Actions.course();
            }
          })
        } else {
          Actions.course();
        }
      })

      this.setState({ isReady: true });
    }, 1000)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: null,
    width: null,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    width: 80,
    height: 80
  },
  loading: {
    width: 50,
    height: 50
  },
})

export default FirstPage;
