import { Exponent, Constants, Google, Facebook} from 'expo';
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
  StatusBar,
  ScrollView
} from 'react-native';

import { Button } from 'react-native-elements';
import styles from '../styles/styles.js';
import * as firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import firebaseConfig from './firebaseConfig.js';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FCM from 'react-native-fcm';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
          email: '',
          password: '',
          bgBlur: Platform.OS === 'ios'? 20:4,
          loginLoading: true,
        }
  }

  _onLoginSuccess = () => {
    FCM.subscribeToTopic('/topics/list');
    Actions.course();
    this.setState({ loginLoading: true })
  }


     emailLogin = () => {
      this.setState({loginLoading: false})
          firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(
              this._onLoginSuccess,


            ).catch(error => {
              var errorCode = error.code;
              var errorMessage = error.message;
              if(errorCode === 'auth/invalid-email'){
                Alert.alert('Invalid Email');
                this.setState({loginLoading: true})
              }
              else if(errorCode === 'auth/user-not-found'){
                Alert.alert('User Not Found');
                this.setState({loginLoading: true})
              }
              else if (errorCode === 'auth/wrong-password') {
                Alert.alert('Wrong password.');
                this.setState({loginLoading: true})
              }
              else {
                Alert.alert(errorMessage);
                this.setState({loginLoading: true})
              }
          })
     }

      _handleButtonPressForgotPasswd = () => {
          Actions.resetPassword();
      };

/*
facebookAuthenticate = (token) => {
  const provider = firebase.auth.FacebookAuthProvider
  const credential = provider.credential(token)
  return firebase.auth().signInWithCredential(credential)
}
*/


  async fblogin(){
    const APP_ID = '437725326585310'
    const options = {
      permissions: ['public_profile', 'email', 'user_photos'],
      behavior: 'native'
    }

    const {type, token} = await Facebook.logInWithReadPermissionsAsync(APP_ID, options)
    if (type === 'success') {
      this.setState({ loginLoading: false })
      const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.type(large)`);
      var result = await response.json();



      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(function () {
          const provider = firebase.auth.FacebookAuthProvider
          const credential = provider.credential(token);

          return firebase.auth().signInWithCredential(credential)
        })
        .catch(function (error) {

          var errorCode = error.code;
          var errorMessage = error.message;

          console.log(errorCode);
          console.log(errorMessage);
        });

      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          const checkCourse = firebase.database().ref('users/' + user.uid);
          checkCourse.once('value', snap => {
            if (snap.val() === null) {
              firebase.database().ref('users/' + user.uid).set({
                username: result.name,
                email: result.email,
                profile_picture: result.picture.data.url
              });
              this._onLoginSuccess
            } else {
              this._onLoginSuccess
            }
          })
        }
      })

      }else {
        Alert.alert("Login Error");
        this.setState({ loginLoading: true })
      }
  };
 
/*
  googleAuthenticate = (loginResult) => {
    const provider = firebase.auth.GoogleAuthProvider
    const credential = provider.credential(null, loginResult.accessToken)
    return firebase.auth().signInWithCredential(credential)
  };
*/

  async gglogin(){
    const loginResult = await Google.logInAsync({
      androidClientId: '601971055178-h9367sqg2o5n5hfkeisparoblbpo0hrt.apps.googleusercontent.com',
      androidStandaloneAppClientId: '601971055178-h9367sqg2o5n5hfkeisparoblbpo0hrt.apps.googleusercontent.com',
      iosClientId: '601971055178-4eqok5dvr6eeqha2tjmkg87396nt7vj4.apps.googleusercontent.com',
      iosStandaloneAppClientId: '601971055178-n9hjsbngjmoqboquarrjakgp1ii068ch.apps.googleusercontent.com',
      webClientId: '383365177474-1t1t1rhflqcuhsqs1oh72geapjt06mto.apps.googleusercontent.com ',
      behavior: 'web',
      scopes: ['profile', 'email'],
    });

      if(loginResult.type === 'success'){
        this.setState({ loginLoading: false })
        console.log('Success')
        console.log(loginResult.user.name + " : " + loginResult.user.email)
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
         .then(function() {
          const provider = firebase.auth.GoogleAuthProvider
          const credential = provider.credential(null, loginResult.accessToken)

          return firebase.auth().signInWithCredential(credential)
      })
      .catch(function(error) {

      var errorCode = error.code;
      var errorMessage = error.message;

      console.log(errorCode);
      console.log(errorMessage);
      });



        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            const checkCourse = firebase.database().ref('users/' + user.uid);
            checkCourse.once('value', snap => {
              if(snap.val() === null){
                firebase.database().ref('users/' + user.uid).set({
                  username: loginResult.user.name,
                  email: loginResult.user.email,
                  profile_picture : loginResult.user.photoUrl
                });
                this._onLoginSuccess
              }else {
                this._onLoginSuccess
              }
            })
          }
        });

      }else {
        Alert.alert("Login Error");
        this.setState({ loginLoading: true })
      }
  };

render() {
  if(!this.state.loginLoading){
    return (
      <View style={{
        flex: 1,
        height: null,
        width: null,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Image style={{width: 80, height: 80}} source={require('../img/logo2.png')} />
        <Image style={{width: 50, height: 50}} source={require('../img/icon/Loading_icon.gif')}/>
      </View>
    )
  }
    return (
      <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled={true}
        extraHeight={Platform.OS === 'ios' ? 50 : 500}
      >
      <View style={styles.body}>
       <StatusBar hidden />
          <View style={styles.topViewStyle}>
            <Image source={require('../img/tb1.jpg')} style={styles.topBackground} blurRadius={this.state.bgBlur}>
              <Image source={require('../img/logo2.png')} style={styles.logoStyle} />
                <View style={{flexDirection: 'row'}}>
                  <TouchableHighlight style={styles.buttonStyle} onPress={this._handleButtonPressSignin} underlayColor="transparent">
                    <View style={styles.signin_button}>
                      <Text style={styles.textStyle}>SIGN IN</Text>
                    </View>
                  </TouchableHighlight>
                  <TouchableHighlight style={styles.buttonStyle} onPress={ () => Actions.signup()} underlayColor="#8f88fc">
                    <View style={styles.signup_button}>
                      <Text style={styles.textStyle}>SIGN UP</Text>
                    </View>
                  </TouchableHighlight>
                </View>
            </Image>
          </View>
          <View>
            <Image source={require('../img/bb1.jpg')} style={styles.bottBackground} blurRadius={this.state.bgBlur}>
            <View style={styles.login_container}>
              <View style={styles.userlogin_view}>
                <Image source={require('../img/userlogo.png')} style={styles.userlogin_logo} />

                <TextInput underlineColorAndroid='transparent'
                  placeholder="Email"
                  placeholderTextColor="#aaaaaa"
                  autoCapitalize='none'
                  style={styles.inputStyle_uname}
                  returnKeyType='next'
                  keyboardType='email-address'
                  onChangeText={(email) => this.setState({email})}
                />
              </View>

              <View style={styles.passwdlogin_view}>
                <Image source={require('../img/passlogo.png')} style={styles.passwdlogin_logo} />
                <TextInput underlineColorAndroid='transparent'
                  placeholder="Password"
                  placeholderTextColor="#aaaaaa"
                  style={styles.inputStyle_passwd}
                  secureTextEntry={true}
                  onChangeText={(password) => this.setState({password})}
                />
              </View>

              <View style={styles.auth_login}>
                <TouchableHighlight onPress={() => this.fblogin()} underlayColor="transparent">
                  <Image source={require('../img/facebook_logo.png')} style={styles.auth_logo} />
                </TouchableHighlight>
                <TouchableHighlight onPress={() => this.gglogin()} underlayColor="transparent">
                  <Image source={require('../img/google_logo.png')} style={styles.auth_logo} />
                </TouchableHighlight>
              </View>
              <View style={styles.continuous_button}>
                <TouchableHighlight onPress={() => this.emailLogin()} underlayColor="#8f88fc">
                    <Text style={styles.continue_text}>Continue</Text>
                </TouchableHighlight>
              </View>
              <View style={styles.forgotpass_button}>
                <TouchableHighlight onPress={this._handleButtonPressForgotPasswd} underlayColor="transparent">
                  <Text style={styles.forgotpass_text}>Forgot Password</Text>
                </TouchableHighlight>
              </View>
              </View>
            </Image>
          </View>
      </View>
      </KeyboardAwareScrollView>
      );
    }
};

export default Login;
