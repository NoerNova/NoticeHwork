import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  Image,
  TouchableHighlight,
  StatusBar,
  Alert,
  Modal,
  Platform,
  PickerIOS,
  ScrollView,
  Keyboard,
  Animated,
  KeyboardAvoidingView,
  TextInput,
  ListView
} from 'react-native';


import styles from '../styles/courseStyle.js';

import { Actions } from 'react-native-router-flux';
import Prompt from 'react-native-prompt';

import PickerAndroid from 'react-native-picker-android';
import DateTimePicker from 'react-native-modal-datetime-picker';
import dtStyles from '../styles/dateTimeStyles.js';
import sdStyles from '../styles/scheduleStyle.js';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import * as firebase from 'firebase';
import firebaseConfig from './firebaseConfig.js';

import ImagePicker from 'react-native-image-picker'
import Toast from 'react-native-simple-toast';
import RNFetchBlob from 'react-native-fetch-blob';

let Picker = Platform.OS === 'ios' ? PickerIOS : PickerAndroid;
let PickerItem = Picker.Item;

let hoursWheel = ['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23'];
let minutesWheel = ['00','05','10','15','20','25','30','35','40','45','50','55'];
const courseScheduleDayTime = [];

let sunTimes = [];
let monTimes = [];
let tueTimes = [];
let wedTimes = [];
let thuTimes = [];
let friTimes = [];
let satTimes = [];

const storage = firebase.storage();

const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob

class NewCourse extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      courseNameView: 'Course Name',
      courseCodeView: 'Course Code',
      courseName: '',
      courseCode: '',

      room: '',
      roomPrompt: false,

      datePickerVisible: false,
      startTimePickerVisible: false,
      endTimePickerVisible: false,

      midtermStartTime: '',
      midtermEndTime: '',
      midtermDate: '',
      finalStartTime: '',
      finalEndTime: '',
      finalDate: '',
      midtermModalVisible: false,
      finalModalVisible: false,

      scheduleModalVisible: false,
      sun: false,
      mon: false,
      tue: false,
      wed: false,
      thu: false,
      fri: false,
      sat: false,
      startHours: null,
      startMinutes: null,
      endHours: null,
      endMinutes: null,
      sunDaySelectStatus: sdStyles.dayButton,
      monDaySelectStatus: sdStyles.dayButton,
      tueDaySelectStatus: sdStyles.dayButton,
      wedDaySelectStatus: sdStyles.dayButton,
      thuDaySelectStatus: sdStyles.dayButton,
      friDaySelectStatus: sdStyles.dayButton,
      satDaySelectStatus: sdStyles.dayButton,
      dataSource: ds.cloneWithRows(courseScheduleDayTime),

      instructorFirstName: '',
      instructorLastName: '',
      instructorPhoto: '',
      instructorPhone: '',
      instructorEmail: '',
      instructorOfficeRoom: '',
      instructorPushId: '',

      instructorModalFirstName: 'First Name',
      instructorModalLastName: 'Last Name',
      instructorModalPhoto: require('../img/icon/person.png'),
      instructorModalPhone: 'Phone',
      instructorModalEmail: 'Email',
      instructorModalOfficeRoom: 'Office Room',

      instructorSaveState: 'cancel',
      instructorModalVisible: false,

      courseNameCodeModalVisible: false
    }
  }

  componentWillMount() {
    let date = new Date();
    let nowHours = date.getHours().toString();
    let nowMinutes = date.getMinutes().toString();
    let nowMinutesCase = '';
    sunTimes = [];
    monTimes = [];
    tueTimes = [];
    wedTimes = [];
    thuTimes = [];
    friTimes = [];
    satTimes = [];
    courseScheduleDayTime = [];
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(courseScheduleDayTime)
    })


    if(nowMinutes >= 0 && nowMinutes < 3){
      nowMinutesCase = '0';
    }
    else if(nowMinutes >= 3 && nowMinutes < 8){
      nowMinutesCase = '1';
    }
    else if(nowMinutes >= 8 && nowMinutes < 13){
      nowMinutesCase = '2';
    }
    else if(nowMinutes >= 13 && nowMinutes < 18){
      nowMinutesCase = '3';
    }
    else if(nowMinutes >= 18 && nowMinutes < 23){
      nowMinutesCase = '4';
    }
    else if(nowMinutes >= 23 && nowMinutes < 28){
      nowMinutesCase = '5';
    }
    else if(nowMinutes >= 28 && nowMinutes < 33){
      nowMinutesCase = '6';
    }
    else if(nowMinutes >= 33 && nowMinutes < 38){
      nowMinutesCase = '7';
    }
    else if(nowMinutes >= 38 && nowMinutes < 43){
      nowMinutesCase = '8';
    }
    else if(nowMinutes >= 43 && nowMinutes < 48){
      nowMinutesCase = '9';
    }
    else if(nowMinutes >= 48 && nowMinutes < 53){
      nowMinutesCase = '10';
    }
    else if(nowMinutes >= 53 && nowMinutes < 58){
      nowMinutesCase = '11';
    }
    else if(nowMinutes >= 58){
      nowMinutesCase = '0'
    }

    this.setState({
      startHours: nowHours,
      startMinutes: nowMinutesCase,
      endHours: nowHours,
      endMinutes: nowMinutesCase
    });
  }

  instructorSave = () => {
      if(this.state.instructorModalFirstName === 'First Name'){
        Alert.alert(
          'Cancel',
          'Not to add teacher infomation?',
            [
              {
                text: 'Cancel', onPress: () => null,
                style: 'cancel'
              },
              {
                text: 'OK', onPress: () => this.setState({instructorModalVisible: false})
              },
            ],
            {
              cancelable: true
            } )
      }
      else{
        this.setState({
          instructorFirstName: this.state.instructorModalFirstName !== 'First Name'? this.state.instructorModalFirstName : '',
          instructorLastName: this.state.instructorModalLastName !== 'Last Name'? this.state.instructorModalLastName : '',
          instructorPhone: this.state.instructorModalPhone !== 'Phone'? this.state.instructorModalPhone : '',
          instructorEmail: this.state.instructorModalEmail !== 'Email'? this.state.instructorModalEmail : '',
          instructorOfficeRoom: this.state.instructorModalOfficeRoom !== 'Office Room'? this.state.instructorModalOfficeRoom : '',
          instructorModalVisible: false
        })
      }
    }

    courseNameCodeSave = () => {
      if(this.state.modalCourseName !== '' && this.state.modalCourseCode !== ''){
        this.setState({
          courseNameView: this.state.courseName,
          courseCodeView: this.state.courseCode,
          courseNameCodeModalVisible: false
        })
      }else{
        this.state.courseName === ''? Alert.alert('Please Check!','Course\'s name cannot be blank'):
        Alert.alert('Please Check!','Course\'s code cannot be blank')
      }
    }


  _pickInstructorPhoto = async() => {
    let options = {
      title: 'Select Instructor Photo',
      maxWidth: 800,
      maxHeight: 800
    }

    ImagePicker.showImagePicker(options, (response) => {

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else {
        this.setState({
          instructorPhoto: response.uri,
          instructorModalPhoto: { uri: 'data:image/jpeg;base64,' + response.data }
        });
      }
    });
  }

  uploadImage = (uri, name, mime = 'image/jpg') => {
    return new Promise((resolve, reject) => {
      const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
      let uploadBlob = null
      let imageName = name
      const imageRef = firebase.storage().ref('images/').child(imageName)
      fs.readFile(uploadUri, 'base64')
        .then((data) => {
          return Blob.build(data, { type: `${mime};BASE64` })
        })
        .then((blob) => {
          uploadBlob = blob
          return imageRef.put(blob, { contentType: mime })
        })
        .then(() => {
          uploadBlob.close()
          return imageRef.getDownloadURL()
        })
        .then((url) => {
          firebase.database().ref('instructor/' + name).update({
            instructor_picture: url
          })
          this.setState({ isReady: true })
        })
        .catch((error) => {
          console.log("Error : " + error)
          this.setState({ isReady: true })
          reject(error)
        })
    })
  }


  handleDate = (date) => {
    var month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    var d = date.getDate() + ' ' + month[date.getMonth()] + ' ' + date.getFullYear();

    if(this.state.midtermModalVisible){
      this.setState({
        midtermDate: d,
        datePickerVisible: false,
      })
    }
    if(this.state.finalModalVisible){
      this.setState({
        finalDate: d,
        datePickerVisible: false,
      })
    }
  }

  handleStartTime = (time) => {
      var hours = time.getHours();
      var minutes = time.getMinutes();
      var ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12;
      minutes = minutes < 10 ? '0'+minutes : minutes;
      var strTimeIOS = hours + ' : ' + minutes + ' ' + ampm;
      var strTimeAndroid = time.getHours() + ' : ' + time.getMinutes();

      if(this.state.midtermModalVisible){
        this.setState({
          midtermStartTime: Platform.OS === 'ios'? strTimeIOS : strTimeAndroid,
          startTimePickerVisible: false
        })
      }
      if(this.state.finalModalVisible){
        this.setState({
          finalStartTime: Platform.OS === 'ios'? strTimeIOS : strTimeAndroid,
          startTimePickerVisible: false
        })
      }
  }



  handleEndTime = (time) => {
    var hours = time.getHours();
    var minutes = time.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTimeIOS = hours + ' : ' + minutes + ' ' + ampm;
    var strTimeAndroid = time.getHours() + ' : ' + time.getMinutes();

    if(this.state.midtermModalVisible){
      this.setState({
        midtermEndTime: Platform.OS === 'ios'? strTimeIOS : strTimeAndroid,
        endTimePickerVisible: false
      })
    }
    if(this.state.finalModalVisible){
      this.setState({
        finalEndTime: Platform.OS === 'ios'? strTimeIOS : strTimeAndroid,
        endTimePickerVisible: false
      })
    }
  }

  setModalVisible(visible){
    this.setState({modalVisible: visible});
  }

  addTime = () => {
    let day = [];
    let fHours = hoursWheel[this.state.startHours].toString();
    let fMinutes = minutesWheel[this.state.startMinutes].toString();
    let lHours = hoursWheel[this.state.endHours].toString();
    let lMinutes = minutesWheel[this.state.endMinutes].toString();
    let newDayTime = '';

    if(this.state.sun){
      day.push(['Sun']);
      sunTimes.push([
        fHours,
        fMinutes,
        lHours,
        lMinutes
      ])
    }
    if(this.state.mon){
      day.push(['Mon']);
      monTimes.push([
        fHours,
        fMinutes,
        lHours,
        lMinutes
      ])
    }
    if(this.state.tue){
      day.push(['tue']);
      tueTimes.push([
        fHours,
        fMinutes,
        lHours,
        lMinutes
      ])
    }
    if(this.state.wed){
      day.push(['Wed']);
      wedTimes.push([
        fHours,
        fMinutes,
        lHours,
        lMinutes
      ])
    }
    if(this.state.thu){
      day.push(['Thu']);
      thuTimes.push([
        fHours,
        fMinutes,
        lHours,
        lMinutes
      ])
    }
    if(this.state.fri){
      day.push(['Fri']);
      friTimes.push([
        fHours,
        fMinutes,
        lHours,
        lMinutes
      ])
    }
    if(this.state.sat){
      day.push(['Sat']);
      satTimes.push([
        fHours,
        fMinutes,
        lHours,
        lMinutes
      ])
    }

    newDayTime = day.toString() + ' ' + fHours + ' : ' + fMinutes + ' to ' + lHours + ' : ' + lMinutes;

    courseScheduleDayTime.push([newDayTime])

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(courseScheduleDayTime)
    })
  }

  submitRoom = (value) => {
    this.setState((value) !== '' ?{ roomPrompt: false, room: (value)} : { roomPrompt: false})
  }

  courseSave = () => {
    let courseName = this.state.courseName
    let courseCode = this.state.courseCode
    let room = this.state.room
    let instructorFirstName = this.state.instructorFirstName
    let instructorLastName = this.state.instructorLastName
    let midtermStartTime = this.state.midtermStartTime
    let midtermEndTime = this.state.midtermEndTime
    let midtermDate = this.state.midtermDate
    let finalStartTime = this.state.finalStartTime
    let finalEndTime = this.state.finalEndTime
    let finalDate = this.state.finalDate
    let instructorPhone = this.state.instructorPhone
    let instructorEmail = this.state.instructorEmail
    let instructorOfficeRoom = this.state.instructorOfficeRoom
    let instructorPushKey = firebase.database().ref('instructor/').push().key

    if(courseName === '' || courseCode === ''){
      Alert.alert(
        'Cancel!',
        'Cancel to create new course? \n or! forget to add course\'s name or course\'s code',
          [
            {
              text: 'Cancel', onPress: () => null,
              style: 'cancel'
            },
            {
              text: 'OK', onPress: () => Actions.pop()
            },
          ],
          {
            cancelable: true
          } )
    }else{

    firebase.database().ref('course/' + this.state.courseCode).once('value').then((snapshot)=> {
      if(snapshot.val() !== null){
        Alert.alert(
          'Course has been created',
          'Course with ' + courseCode +' CourseID was already created \n please try again with another CodeID '
         )
      }else{

          var user = firebase.auth().currentUser;
          var userUid = user.uid;

          if (user != null) {
            firebase.database().ref('course/' + courseCode + '/courseDetail').set({
                courseName: courseName,
                courseRoom: room,
                courseInstructor:  instructorPushKey,
                courseMidterm : {
                  midtermStartTime : midtermStartTime,
                  midtermEndTime : midtermEndTime,
                  midtermDate : midtermDate
                },
                courseFinal : {
                  finalStartTime : finalStartTime,
                  finalEndTime : finalEndTime,
                  finalDate : finalDate,
                },
              });

              firebase.database().ref('course/' + courseCode + '/courseMember').child(user.displayName).set(
                 "Admin"
               );

               firebase.database().ref('users/' + userUid + '/courseList').child(courseCode).set(
                  courseName
                );


            if(sunTimes.length > 0){
                for(index = 0; index < sunTimes.length; index++){
                    firebase.database().ref('course/' + courseCode + '/courseDetail/courseSchedule/sun/' + index).set({
                          firstHours : sunTimes[index][0],
                          firstMinutes : sunTimes[index][1],
                          lastHours : sunTimes[index][2],
                          lastMinutes : sunTimes[index][3]
                    })
                }
              }
            if(monTimes.length > 0){
                for(index = 0; index < monTimes.length; index++){
                    firebase.database().ref('course/' + courseCode + '/courseDetail/courseSchedule/mon/' + index).set({
                      firstHours : monTimes[index][0],
                      firstMinutes : monTimes[index][1],
                      lastHours : monTimes[index][2],
                      lastMinutes : monTimes[index][3]
                    })
                }
              }
            if(tueTimes.length > 0){
                for(index = 0; index < tueTimes.length; index++){
                    firebase.database().ref('course/' + courseCode + '/courseDetail/courseSchedule/tue/' + index).set({
                      firstHours : tueTimes[index][0],
                      firstMinutes : tueTimes[index][1],
                      lastHours : tueTimes[index][2],
                      lastMinutes : tueTimes[index][3]
                    })
                }
              }
            if(wedTimes.length > 0){
                for(index = 0; index < wedTimes.length; index++){
                    firebase.database().ref('course/' + courseCode + '/courseDetail/courseSchedule/wed/' + index).set({
                      firstHours : wedTimes[index][0],
                      firstMinutes : wedTimes[index][1],
                      lastHours : wedTimes[index][2],
                      lastMinutes : wedTimes[index][3]
                    })
                }
              }
            if(thuTimes.length > 0){
                for(index = 0; index < thuTimes.length; index++){
                    firebase.database().ref('course/' + courseCode + '/courseDetail/courseSchedule/thu/' + index).set({
                      firstHours : thuTimes[index][0],
                      firstMinutes : thuTimes[index][1],
                      lastHours : thuTimes[index][2],
                      lastMinutes : thuTimes[index][3]
                    })
                }
              }
            if(friTimes.length > 0){
                for(index = 0; index < friTimes.length; index++){
                    firebase.database().ref('course/' + courseCode + '/courseDetail/courseSchedule/fri/' + index).set({
                      firstHours : friTimes[index][0],
                      firstMinutes : friTimes[index][1],
                      lastHours : friTimes[index][2],
                      lastMinutes : friTimes[index][3]
                    })
                }
              }
            if(satTimes.length > 0){
                for(index = 0; index < satTimes.length; index++){
                    firebase.database().ref('course/' + courseCode + '/courseDetail/courseSchedule/sat/' + index).set({
                      firstHours : satTimes[index][0],
                      firstMinutes : satTimes[index][1],
                      lastHours : satTimes[index][2],
                      lastMinutes : satTimes[index][3]
                    })
                }
              }

              firebase.database().ref('instructor/' + instructorPushKey).set({
                firstName : instructorFirstName,
                lastName : instructorLastName,
                phone : instructorPhone,
                email : instructorEmail,
                officeRoom: instructorOfficeRoom
              }).then(() => {
                if (this.state.instructorPhoto !== '') {
                  this.uploadImage(this.state.instructorPhoto, instructorPushKey);
                }
              })
              

                  Alert.alert('Complete', 'Created New \''+ courseName+ '\' Course.')
                  Actions.course();
          } else {
              Alert.alert('Someting is going wrong');
          }
        }

      })
    }
  }



  render() {
    return(
      <View style={styles.newCourseContainer}>
      <StatusBar hidden />
        <Image style={styles.courseTitle} source={require('../img/classRoom.jpg')}>
          <TouchableHighlight onPress={() => this.setState({ courseNameCodeModalVisible: true})} underlayColor="rgba(200,200,200,0.4)">
            <View>
              <Text style={styles.courseName} numberOfLines={1}>{this.state.courseNameView}</Text>
              <Text style={styles.courseCode} numberOfLines={1}>{this.state.courseCodeView}</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight style={styles.saveButton} onPress={() => this.courseSave()} underlayColor='rgba(200,200,200,0.4)'>
            <Text style={styles.saveText}>
              {this.state.courseName === '' &&
              this.state.courseCode === ''? 'cancel':'save'}
            </Text>
          </TouchableHighlight>

        </Image>
        <View style={{
          borderBottomWidth: 2,
          marginBottom: 20,
          borderColor: 'rgba(0,0,0,0.2)',
        }}></View>

        <View style={{flexDirection: 'row'}}>
          <Image style={styles.icon} source={require('../img/icon/instructor.png')}/>
          <TouchableHighlight style={styles.setDetail} onPress={() => this.setState({instructorModalVisible: true})} underlayColor="rgba(200,200,200,0.4)">
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.setDetailText}>Instructor</Text>
              <Text style={styles.completeSetDetail} numberOfLines={1}>{this.state.instructorModalFirstName !== 'First Name'? this.state.instructorModalFirstName:''}</Text>
            </View>
          </TouchableHighlight>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Image style={styles.icon} source={require('../img/icon/room.png')}/>
          <TouchableHighlight style={styles.setDetail} onPress={() => this.setState({roomPrompt: true})} underlayColor="rgba(200,200,200,0.4)">
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.setDetailText}>Room</Text>
              <Text style={styles.completeSetDetail} numberOfLines={1}>{this.state.room}</Text>
            </View>
          </TouchableHighlight>
          </View>
        <View style={{flexDirection: 'row'}}>
          <Image style={styles.icon} source={require('../img/icon/calendar.png')}/>
          <TouchableHighlight style={styles.setDetail} onPress={() => this.setState({midtermModalVisible: true})} underlayColor="rgba(200,200,200,0.4)">
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.setDetailText}>Midterm</Text>
              <Text style={styles.completeSetDetail} numberOfLines={1}>{this.state.midtermDate}</Text>
            </View>
          </TouchableHighlight>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Image style={styles.icon} source={require('../img/icon/calendar.png')}/>
          <TouchableHighlight style={styles.setDetail} onPress={() => this.setState({finalModalVisible: true})} underlayColor="rgba(200,200,200,0.4)">
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.setDetailText}>Final</Text>
              <Text style={styles.completeSetDetail} numberOfLines={1}>{this.state.finalDate}</Text>
            </View>
          </TouchableHighlight>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Image style={styles.icon} source={require('../img/icon/schedule.png')}/>
          <TouchableHighlight style={styles.setDetail} onPress={() => this.setState({scheduleModalVisible: true})} underlayColor="rgba(200,200,200,0.4)">
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.setDetailText}>Schedule</Text>
              <Text style={styles.completeSetDetail} numberOfLines={1}>{courseScheduleDayTime.toString()}</Text>
            </View>
          </TouchableHighlight>
        </View>

      <Prompt
        title="Room"
        placeholder={this.state.room !== ''? this.state.room: 'Class Room...'}
        visible={this.state.roomPrompt}
        textInputProps={{maxLength: 5,autoCapitalize: 'characters'}}
        onCancel={() => this.setState({ roomPrompt: false })}
        onSubmit={(value) => this.submitRoom(value)}
      />

      <Modal
        animationType={'slide'}
        transparent={true}
        visible={this.state.courseNameCodeModalVisible}
        onRequestClose={() => {this.setState({courseNameCodeModalVisible: false})}}
      >
        <View style={styles.courseContainer}>
        <KeyboardAwareScrollView>
        <View style={styles.courseSettingContainer}>
        <View style={styles.exitContainer}>
          <TouchableHighlight underlayColor='rgba(200,200,200,0.4)'
            onPress={() => this.setState({courseNameCodeModalVisible: false})}>
            <Image style={styles.exitIcon} source={require('../img/icon/exit2.png')}></Image>
          </TouchableHighlight>
        </View>
          <View style={styles.courseModalTitle}>
            <Text style={styles.courseModalTitleText}>Course</Text>
          </View>
          <View style={{
            borderBottomWidth: 2,
            borderColor: 'rgba(0,0,0,0.8)',
          }}></View>

          <View>
            <View style={styles.courseNameInput}>
              <TextInput
                style={styles.courseNameInputText}
                underlineColorAndroid ='transparent'
                placeholder={this.state.courseNameView}
                placeholderTextColor="rgba(0,0,0,0.2)"
                returnKeyType='next'
                autoCapitalize='words'
                onChangeText={(value) => this.setState({courseName: (value)})}
              />
            </View>
          <View style={styles.courseNameInput}>
            <TextInput
              style={styles.courseNameInputText}
              underlineColorAndroid ='transparent'
              placeholder={this.state.courseCodeView}
              placeholderTextColor="rgba(0,0,0,0.2)"
              returnKeyType='next'
              autoCapitalize='characters'
              maxLength={5}
              onChangeText={(value) => this.setState({courseCode: (value)})}
            />
            </View>
          </View>

          <View style={{
            borderBottomWidth: 2,
            borderColor: 'rgba(0,0,0,0.8)',
            marginTop: -1,
          }}></View>
          <View style={styles.courseConfirmButton}>
          <TouchableHighlight onPress={() => this.courseNameCodeSave()} underlayColor='rgba(200,200,200,0.4)'>
            <Text style={styles.courseConfirmButtonText}>OK</Text>
          </TouchableHighlight>
          </View>
          </View>
          </KeyboardAwareScrollView>
        </View>
      </Modal>

      <Modal
        animationType={'slide'}
        transparent={true}
        visible={this.state.midtermModalVisible || this.state.finalModalVisible}
        onRequestClose={() => {this.setState({midtermModalVisible: false, finalModalVisible: false})}}
      >
        <View style={dtStyles.container}>
        <View style={dtStyles.settingContainer}>
        <View style={dtStyles.exitContainer}>
          <TouchableHighlight underlayColor='rgba(200,200,200,0.4)'
          onPress={() => this.setState({midtermModalVisible: false, finalModalVisible: false, midtermStartTime: '',
          midtermEndTime: '',
          midtermDate: '',
          finalStartTime: '',
          finalEndTime: '',
          finalDate: '',
          })}>
            <Image style={dtStyles.exitIcon} source={require('../img/icon/exit2.png')}></Image>
          </TouchableHighlight>
        </View>
          <View style={dtStyles.modalTitle}>
            <Text style={dtStyles.modalTitleText}>Set Date and Time</Text>
          </View>
          <View style={{
            borderBottomWidth: 2,
            borderColor: 'rgba(0,0,0,0.8)',
          }}></View>

          <TouchableHighlight style={dtStyles.setDetail} onPress={() =>this.setState({startTimePickerVisible: true})} underlayColor='rgba(200,200,200,0.4)'>
            <View style={{flexDirection: 'row'}}>
              <Text style={dtStyles.setDetailText}>Start</Text>
              <Text style={dtStyles.completeSetDetail}>{this.state.midtermModalVisible? this.state.midtermStartTime : this.state.finalStartTime}</Text>
            </View>
          </TouchableHighlight>
          <DateTimePicker
            isVisible={this.state.startTimePickerVisible}
            mode='time'
            titleIOS='Pick a time'
            onConfirm={this.handleStartTime}
            onCancel={() => this.setState({startTimePickerVisible: false})}
          />

          <TouchableHighlight style={dtStyles.setDetail} onPress={() => this.setState({endTimePickerVisible: true})} underlayColor='rgba(200,200,200,0.4)'>
            <View style={{flexDirection: 'row'}}>
              <Text style={dtStyles.setDetailText}>To</Text>
              <Text style={dtStyles.completeSetDetail}>{this.state.midtermModalVisible? this.state.midtermEndTime : this.state.finalEndTime}</Text>
            </View>
          </TouchableHighlight>
          <DateTimePicker
            isVisible={this.state.endTimePickerVisible}
            mode='time'
            titleIOS='Pick a time'
            onConfirm={this.handleEndTime}
            onCancel={() => this.setState({endTimePickerVisible: false})}
          />
          <TouchableHighlight style={dtStyles.setDetail} onPress={() =>this.setState({datePickerVisible: true})} underlayColor='rgba(200,200,200,0.4)'>
            <View style={{flexDirection: 'row'}}>
              <Text style={dtStyles.setDetailText}>Date</Text>
              <Text style={dtStyles.completeSetDetail}>{this.state.midtermModalVisible? this.state.midtermDate : this.state.finalDate}</Text>
            </View>
          </TouchableHighlight>
          <DateTimePicker
            isVisible={this.state.datePickerVisible}
            mode='date'
            datePickerModeAndroid='spinner'
            onConfirm={this.handleDate}
            onCancel={() => this.setState({datePickerVisible: false})}
          />

          <View style={{
            borderBottomWidth: 2,
            borderColor: 'rgba(0,0,0,0.8)',
            marginTop: -1,
          }}></View>
          <View style={dtStyles.confirmButton}>
          <TouchableHighlight onPress={() => this.setState({midtermModalVisible: false, finalModalVisible: false})} underlayColor='rgba(200,200,200,0.4)'>
            <Text style={dtStyles.confirmButtonText}>OK</Text>
          </TouchableHighlight>
          </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType={'slide'}
        transparent={true}
        visible={this.state.scheduleModalVisible}
        onRequestClose={() => this.setState({scheduleModalVisible: false})}
      >
      <View style={sdStyles.fContainer}>
      <ScrollView style={sdStyles.sContainer}>
        <View style={sdStyles.exitContainer}>
          <TouchableHighlight onPress={() => this.setState({scheduleModalVisible: false})} underlayColor='rgba(200,200,200,0.4)'>
            <Image style={sdStyles.exitIcon} source={require('../img/icon/exit2.png')}></Image>
          </TouchableHighlight>
        </View>
        <View style={sdStyles.titleContainer}>
          <Text style={sdStyles.titleText}>Schedule</Text>
        </View>
        <View style={{
          borderBottomWidth: 1,
          width: null,
          marginBottom: 20
        }}></View>
        <View style={{alignItems: 'center'}}>
          <View style={sdStyles.buttonContainer}>
            <TouchableHighlight
              style={this.state.sunDaySelectStatus}
              onPress={
                () => this.setState({
                  sun: this.state.sun? false : true,
                  sunDaySelectStatus: this.state.sun? sdStyles.dayButton : sdStyles.daySelectButton
                })
              }
                underlayColor="rgba(0,0,0,0.1)"
            >
              <Text style={sdStyles.dayButtonText}>Sun</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={this.state.monDaySelectStatus}
              onPress={
                () => this.setState({
                  mon: this.state.mon? false : true,
                  monDaySelectStatus: this.state.mon? sdStyles.dayButton : sdStyles.daySelectButton
                })
              }
                underlayColor="rgba(0,0,0,0.1)"
            >
              <Text style={sdStyles.dayButtonText}>Mon</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={this.state.tueDaySelectStatus}
              onPress={
                () => this.setState({
                  tue: this.state.tue? false : true,
                  tueDaySelectStatus: this.state.tue? sdStyles.dayButton : sdStyles.daySelectButton
                })
              }
                underlayColor="rgba(0,0,0,0.1)"
            >
              <Text style={sdStyles.dayButtonText}>Tue</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={this.state.wedDaySelectStatus}
              onPress={
                () => this.setState({
                  wed: this.state.wed? false : true,
                  wedDaySelectStatus: this.state.wed? sdStyles.dayButton : sdStyles.daySelectButton
                })
              }
                underlayColor="rgba(0,0,0,0.1)"
            >
              <Text style={sdStyles.dayButtonText}>Wed</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={this.state.thuDaySelectStatus}
              onPress={
                () => this.setState({
                  thu: this.state.thu? false : true,
                  thuDaySelectStatus: this.state.thu? sdStyles.dayButton : sdStyles.daySelectButton
                })
              }
                underlayColor="rgba(0,0,0,0.1)"
            >
              <Text style={sdStyles.dayButtonText}>Thu</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={this.state.friDaySelectStatus}
              onPress={
                () => this.setState({
                  fri: this.state.fri? false : true,
                  friDaySelectStatus: this.state.fri? sdStyles.dayButton : sdStyles.daySelectButton
                })
              }
                underlayColor="rgba(0,0,0,0.1)"
            >
              <Text style={sdStyles.dayButtonText}>Fri</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={this.state.satDaySelectStatus}
              onPress={
                () => this.setState({
                  sat: this.state.sat? false : true,
                  satDaySelectStatus: this.state.sat? sdStyles.dayButton : sdStyles.daySelectButton
                })
              }
                underlayColor="rgba(0,0,0,0.1)"
            >
              <Text style={sdStyles.dayButtonText}>Sat</Text>
            </TouchableHighlight>
          </View>
        </View>

        <View style={sdStyles.timePickerArea}>
           <View style={sdStyles.pickerView}>
              <Picker
                  selectedValue={this.state.startHours}
                  onValueChange={(startHours) => this.setState({startHours})}>
                  {Object.keys(hoursWheel).map((startHours) => (
                      <PickerItem
                          key={startHours}
                          value={startHours}
                          label={hoursWheel[startHours]}
                      />
                  ))}
              </Picker>
              </View>
              <Text style={sdStyles.toText}> : </Text>
              <View style={sdStyles.pickerView}>
              <Picker
                  selectedValue={this.state.startMinutes}
                  key={this.state.minutes}
                  onValueChange={(startMinutes) => this.setState({startMinutes})}>
                  {Object.keys(minutesWheel).map((startMinutes) => (
                      <PickerItem
                          key={startMinutes}
                          value={startMinutes}
                          label={minutesWheel[startMinutes]}
                      />
                  ))}
              </Picker>
            </View>

            <Text style={sdStyles.toText}> To </Text>

            <View style={sdStyles.pickerView}>
               <Picker
                   selectedValue={this.state.endHours}
                   onValueChange={(endHours) => this.setState({endHours})}>
                   {Object.keys(hoursWheel).map((endHours) => (
                       <PickerItem
                           key={endHours}
                           value={endHours}
                           label={hoursWheel[endHours]}
                       />
                   ))}
               </Picker>
          </View>
          <Text style={sdStyles.toText}> : </Text>
          <View style={sdStyles.pickerView}>
          <Picker
              selectedValue={this.state.endMinutes}
              key={this.state.minutes}
              onValueChange={(endMinutes) => this.setState({endMinutes})}>
              {Object.keys(minutesWheel).map((endMinutes) => (
                  <PickerItem
                      key={endMinutes}
                      value={endMinutes}
                      label={minutesWheel[endMinutes]}
                  />
              ))}
          </Picker>
        </View>
        </View>
        <View style={{alignItems: 'center'}}>
          <TouchableHighlight style={sdStyles.addButton} onPress={() => this.addTime()} underlayColor="rgba(0,0,0,0.1)">
            <Text style={{fontSize: 26}}>+</Text>
          </TouchableHighlight>
        </View>
        <View style={sdStyles.dayTimeListContainer}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={(rowData) => <View style={sdStyles.dayTimeListView}><Text>{rowData}</Text></View>}
            enableEmptySections
          />
        </View>
      </ScrollView >
      </View>
        <View style={styles.courseConfirmButton}>
          <TouchableHighlight onPress={() => this.setState({scheduleModalVisible: false})} underlayColor='rgba(200,200,200,0.4)'>
            <Text style={styles.courseConfirmButtonText}>OK</Text>
          </TouchableHighlight>
        </View>
      </Modal>

      <Modal
        animationType={'slide'}
        transparent={false}
        visible={this.state.instructorModalVisible}
        onRequestClose={() => this.setState({instructorModalVisible: false})}
      >
      <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled={false}
        extraHeight={Platform.OS === 'ios'? 50:130}
      >
        <View style={styles.instructorContainer}>
        <Image style={styles.instructorTitle}   blurRadius={Platform.OS === 'ios'? 10:5} source={require('../img/tb2.jpg')}>
            <View style={styles.exitContainer}>
              <TouchableHighlight onPress={() => this.setState({instructorModalVisible: false})} underlayColor='rgba(200,200,200,0.4)'>
                <Image style={styles.exitIcon} source={require('../img/icon/exit2.png')}></Image>
              </TouchableHighlight>
            </View>
            <View style={{flexDirection: 'row'}}>
              <TouchableHighlight style={styles.instructorPhoto} onPress={this._pickInstructorPhoto} underlayColor="rgba(200,200,200,0.4)">
                <Image source={this.state.instructorModalPhoto} style={styles.instructorPhotoText}></Image>
              </TouchableHighlight>
              <View>
                <View style={styles.instructorNameInputBorder}>
                  <TextInput
                    style={styles.instructorNameInput}
                    underlineColorAndroid ='transparent'
                    placeholder={this.state.instructorModalFirstName !== ''? this.state.instructorModalFirstName : 'First Name'}
                    placeholderTextColor="white"
                    returnKeyType='next'
                    autoCapitalize='words'
                    onChangeText={(instructorModalFirstName) => this.setState({instructorModalFirstName})}
                  />
                </View>
                <View style={styles.instructorNameInputBorder}>
                <TextInput
                  style={styles.instructorNameInput}
                  underlineColorAndroid ='transparent'
                  placeholder={this.state.instructorModalLastName !== ''? this.state.instructorModalLastName : 'Last Name'}
                  placeholderTextColor="white"
                  returnKeyType='next'
                  autoCapitalize='words'
                  onChangeText={(instructorModalLastName) => this.setState({instructorModalLastName})}
                />
                </View>
              </View>
            </View>
            <TouchableHighlight style={styles.saveButton} onPress={() => this.instructorSave()}>
              <Text style={styles.saveText}>
                {this.state.instructorModalFirstName === 'First Name' ||
                  this.state.instructorModalFirstName === ''? 'cancel':'save'}
              </Text>
            </TouchableHighlight>
      </Image>
          <View style={{
            borderBottomWidth: 30,
            borderColor: 'rgba(99,5,196,0.5)',
            marginTop: 10,
          }}></View>
          <View style={{
            borderBottomWidth: 2,
            borderColor: 'rgba(0,0,0,0.2)',
            marginTop: 10,
          }}></View>

          <View style={{ marginTop: 20}}>
            <View style={{flexDirection: 'row'}}>
              <Image style={styles.icon} source={require('../img/icon/call.png')}/>
              <View style={styles.instructorDetailBorder}>
                <TextInput
                  style={styles.instructorDetailInput}
                  underlineColorAndroid='transparent'
                  placeholder={this.state.instructorModalPhone !== ''? this.state.instructorModalPhone : 'Phone'}
                  placeholderTextColor="#aaaaaa"
                  returnKeyType='next'
                  keyboardType={'numeric'}
                  onChangeText={(instructorModalPhone) => this.setState({instructorModalPhone})}
                />
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Image style={styles.icon} source={require('../img/icon/email.png')}/>
              <View style={styles.instructorDetailBorder}>
                <TextInput
                  style={styles.instructorDetailInput}
                  underlineColorAndroid='transparent'
                  placeholder={this.state.instructorModalEmail !== ''? this.state.instructorModalEmail : 'Email'}
                  placeholderTextColor="#aaaaaa"
                  keyboardType="email-address"
                  returnKeyType='next'
                  onChangeText={(instructorModalEmail) => this.setState({instructorModalEmail})}
                />
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Image style={styles.icon} source={require('../img/icon/room.png')}/>
              <View style={styles.instructorDetailBorder}>
                <TextInput
                  style={styles.instructorDetailInput}
                  underlineColorAndroid='transparent'
                  placeholder={this.state.instructorModalOfficeRoom !== ''? this.state.instructorModalOfficeRoom : 'Office Room'}
                  placeholderTextColor="#aaaaaa"
                  returnKeyType='next'
                  autoCapitalize='characters'
                  maxLength={5}
                  onChangeText={(instructorModalOfficeRoom) => this.setState({instructorModalOfficeRoom})}
                />
              </View>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
      </Modal>
    </View>
    );
  }
};

export default NewCourse;
