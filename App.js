import React, { Component } from 'react';
import {
  AppRegistry,
  View,
  Text,
  Platform,
  Alert,
  TouchableHighlight,
  Dimensions,
  AsyncStorage,
  ActivityIndicator
} from 'react-native';


import FirstPage from './src/components/firsePage.js';
import Login from './src/components/login';
import Signup from './src/components/signup';
import ResetPassword from './src/components/resetPassword.js';
import Course from './src/components/course.js';
import NewCourse from './src/components/newCourse.js';
import MainScreen from './src/components/mainScreen.js';
import CreateNewTask from './src/components/createNewTask.js';
import AccountSetting from './src/components/accountSetting.js';


import { Actions , Router, Scene } from 'react-native-router-flux';

import LoginSuccess from './src/components/loginSuccess.js';

import testFCM from './src/testFCM/testFCM';




export default class NoticeHwork extends Component {
  constructor(props){
    super(props);

      console.ignoredYellowBox = [
         'Setting a timer'
     ]; //{Waitting for solve setting a timer from firebase team}
  }


  render() {
      return(
      <Router>
        <Scene key='firstpage'
          component={FirstPage}
          hideNavBar={true}
          initial
        />
        <Scene key='login'
          component={Login}
          hideNavBar={true}
          type="popAndReplace"
        />
        <Scene key='signup'
          component={Signup}
          hideNavBar={true}
          type='push'
        />
        <Scene key='success'
          component={LoginSuccess}
          hideNavBar={true}
        />
        <Scene key='resetPassword'
          component={ResetPassword}
          hideNavBar={true}
        />

        <Scene key='course'
          component={Course}
          panHandlers={null}
          hideNavBar={true}
        />

        <Scene key='newcourse'
          component={NewCourse}
          hideNavBar={true}
          back
        />


      <Scene key='mainscreen'
        component={MainScreen}
        panHandlers={null}
        hideNavBar={true}
        type="replace"
      />

      <Scene key='createNewTask'
        component={CreateNewTask}
        hideNavBar={true}
        type="push"
      />

      <Scene key='accountsetting'
        component={AccountSetting}
        hideNavBar={true}
        type="push"
      />

      <Scene key='testFCM'
        component={testFCM}
        hideNavBar={true}
        type="push"
      />

  </Router>
    );
  }
}
