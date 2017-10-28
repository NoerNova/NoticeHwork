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
    ScrollView,
    Keyboard,
} from 'react-native';

import { Button } from 'react-native-elements';
import styles from '../styles/styles.js';
import * as firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import firebaseConfig from './firebaseConfig.js';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';



class Signup extends Component {

  constructor(props){
    super(props);
    this.state = {
        loading: false,
        email: '',
        usrName: '',
        password: '',
        confirmPasswd: '',
        signUpLoading: true,
        bgBlur: Platform.OS === 'ios'? 10:2
      }
  }

  _onLoginSuccess = () => {
    FCM.subscribeToTopic('/topics/list');
    Actions.course();
  }

  _handleSignUp = () => {
    this.setState({ signUpLoading: false })
         
      if(this.state.email !== '' && this.state.usrName !== ''){
        if(this.state.password !== '' && this.state.confirmPasswd !== ''){
          if (this.state.password === this.state.confirmPasswd) {
            this.setState({ signUpLoading: false })
            firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(fireUser => {
              var user = firebase.auth().currentUser;

              if (user) {
                firebase.database().ref('users/' + user.uid).set({
                  username: this.state.usrName,
                  email: this.state.email,
                });
                user.updateProfile({
                  displayName: this.state.usrName,
                })
              }

              this._onLoginSuccess

            }).catch(function (error) {
              var errorMessage = error.message;
              Alert.alert("Failed!", errorMessage);
              this.setState({ signUpLoading: true })
            });
          }
          else {
            this.setState({ signUpLoading: true })
            Alert.alert(
              'Password miss match!',
              'Please reconfirmation password'
            );
          }
        }else{
          Alert.alert('Sign up, failed', 'Please Enter Password and Confirm password');
          this.setState({signUpLoading: true})
        }
      }else{
        Alert.alert('Sing up, failed','Please Enter both email address and user name');
        this.setState({signUpLoading: true})
      }
    };

  async fblogin() {
    const APP_ID = '437725326585310'
    const options = {
      permissions: ['public_profile', 'email', 'user_photos'],
      behavior: 'native'
    }

    const { type, token } = await Facebook.logInWithReadPermissionsAsync(APP_ID, options)
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

    } else {
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
  
   async gglogin() {

     const loginResult = await Google.logInAsync({
       androidClientId: '601971055178-h9367sqg2o5n5hfkeisparoblbpo0hrt.apps.googleusercontent.com',
       androidStandaloneAppClientId: '601971055178-h9367sqg2o5n5hfkeisparoblbpo0hrt.apps.googleusercontent.com',
       iosClientId: '601971055178-4eqok5dvr6eeqha2tjmkg87396nt7vj4.apps.googleusercontent.com',
       iosStandaloneAppClientId: '601971055178-n9hjsbngjmoqboquarrjakgp1ii068ch.apps.googleusercontent.com',
       webClientId: '383365177474-1t1t1rhflqcuhsqs1oh72geapjt06mto.apps.googleusercontent.com ',
       behavior: 'web',
       scopes: ['profile', 'email'],
     });

     if (loginResult.type === 'success') {
       this.setState({ signUpLoading: false })
       console.log('Success')
       console.log(loginResult.user.name + " : " + loginResult.user.email)
       firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
         .then(function () {
           const provider = firebase.auth.GoogleAuthProvider
           const credential = provider.credential(null, loginResult.accessToken)

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
                 username: loginResult.user.name,
                 email: loginResult.user.email,
                 profile_picture: loginResult.user.photoUrl
               });

               this._onLoginSuccess
             } else {
               this._onLoginSuccess
             }
           })
         }
       });

     } else {
       Alert.alert("Login Error");
       this.setState({ signUpLoading: true})
     }
   };

render() {
  if(!this.state.signUpLoading){
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
        <Text>Signing Up...</Text>
      </View>
    )
  }

    return(
        <View style={styles.body}>
        <StatusBar hidden />
          <View style={styles.signUp_header}>
            <Image source={require('../img/tb1.jpg')} style={styles.topBackground} >
                <View style={{flexDirection: 'row'}}>
                  <TouchableHighlight style={styles.buttonStyle} onPress={() => Actions.login()} underlayColor="transparent">
                    <View style={stylesIn.signIN}>
                      <Text style={styles.textStyle}>SIGN IN</Text>
                    </View>
                  </TouchableHighlight>
                  <Image source={require('../img/logo2.png')} style={styles.signUp_logo} />
                  <TouchableHighlight style={styles.buttonStyle} onPress={this._handleButtonPressSignup} underlayColor="transparent">
                    <View style={stylesIn.signUP}>
                      <Text style={styles.textStyle}>SIGN UP</Text>
                    </View>
                  </TouchableHighlight>
                </View>
            </Image>
          </View>
          <View>

            <Image source={require('../img/bb1.jpg')} style={styles.bottBackground} blurRadius={this.state.bgBlur}>
            <KeyboardAwareScrollView
              resetScrollToCoords={{ x: 0, y: 0 }}
              contentContainerStyle={styles.container}
              scrollEnabled={false}
            >
              <ScrollView>
                <View style={styles.signinput_container}>

                  <Text style={styles.signup_text}>
                    EMAIL
                  </Text>
                  <TextInput
                    underlineColorAndroid='transparent'
                    style={styles.signUp_input}
                    keyboardType='email-address'
                    onChangeText={(email) => {this.state.email = (email)}}
                   />

                   <Text style={styles.signup_text}>
                     USERNAME
                   </Text>
                   <TextInput underlineColorAndroid='transparent'
                    style={styles.signUp_input}
                    onChangeText={(usrName) => {this.state.usrName = (usrName)}}
                   />

                   <Text style={styles.signup_text}>
                    PASSWORD
                    </Text>
                   <TextInput underlineColorAndroid='transparent'
                    secureTextEntry={true}
                    style={styles.signUp_input}
                    onChangeText={(password) => {this.state.password = (password)}}
                   />

                   <Text style={styles.signup_text}>
                    CONFIRM PASSWORD
                   </Text>
                   <TextInput underlineColorAndroid='transparent'
                    secureTextEntry={true}
                    placeholder={this.state.confirmPlaceHolder}
                    style={styles.signUp_input}
                    onChangeText={(confirmPasswd) => {this.state.confirmPasswd = (confirmPasswd)}}
                   />

                   <View style={styles.signupConfirm_button}>
                    <TouchableHighlight onPress={() => this._handleSignUp()} underlayColor="transparent">
                         <Text style={styles.signupConfirm_text}>SignUp</Text>
                     </TouchableHighlight>
                   </View>

                   <View style={{
                     flexDirection:'row',
                     marginTop: 20,
                     alignItems: 'center',
                     justifyContent: 'center',
                   }}>
                     <View
                        style={{
                          borderBottomWidth: 1,
                          borderBottomColor: 'white',
                          width: 70,
                          marginRight: 10,
                          marginTop: 2
                        }}
                      />
                      <Text style={{backgroundColor: 'transparent', color: 'white' }}>OR</Text>
                      <View
                         style={{
                           borderBottomWidth: 1,
                           borderBottomColor: 'white',
                           width: 70,
                           marginLeft: 10,
                           marginTop: 2
                         }}
                       />
                  </View>

                  <View style={{
                    flexDirection: Platform.OS === 'ios' ? 'row' : 'column',
                    marginTop: 20,
                  }}>
                    <TouchableHighlight onPress={() => this.fblogin()}
                      underlayColor="transparent"
                      style={{
                        marginTop: Platform.OS === 'ios' ? 0 : 10
                      }}>
                      <Text style={{color:'#308db2'}}>Login with facebook</Text>
                    </TouchableHighlight>

                    <TouchableHighlight onPress={() => this.gglogin()}
                      underlayColor="transparent"
                      style={{
                        marginTop: Platform.OS === 'ios' ? 0 : 20,
                        marginLeft: Platform.OS === 'ios' ? 20 : 10
                      }}>
                      <Text style={{color:'#308db2'}}>Login with google</Text>
                    </TouchableHighlight>
                  </View>

                </View>
              </ScrollView>
              </KeyboardAwareScrollView>
            </Image>
          </View>
        </View>
    );
  }
}

const stylesIn = StyleSheet.create({
  signIN: {
    backgroundColor: 'transparent',
    paddingLeft: 20,
    paddingTop: Platform.OS === 'ios' ? 20 : 25,
    padding: 8
  },
  signUP: {
    backgroundColor: 'transparent',
    borderBottomWidth: 3,
    borderColor: '#8F88FC',
    paddingLeft: Platform.OS === 'ios' ? 40 : 60,
    paddingRight: 30,
    paddingTop: Platform.OS === 'ios' ? 20 : 25,
    padding: 8
  },
});

export default Signup;
