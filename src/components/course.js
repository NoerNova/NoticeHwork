import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  Image,
  TouchableHighlight,
  Alert,
  StatusBar,
  ScrollView,
  TextInput,
  Modal,
  Platform,
  Keyboard
} from 'react-native';

import { AppLoading } from 'expo';

import styles from '../styles/courseStyle.js';

import { Actions } from 'react-native-router-flux';

import * as firebase from 'firebase';
import firebaseConfig from './firebaseConfig.js';

import PushController from "./PushController";
import Toast from 'react-native-simple-toast';



class Course extends Component {
  constructor(){
    super();
    this.state = {
      isReady: false,
      courseNameTask: [],
      courseCodeTask: [],
      course: null,

      courseCodeParam: '',
      searchCourseName: '',
      test:false,

      email : '',
      firstName : '',
      lastName : '',
      officeRoom : '',
      phone : '',

      courseInstructor : '',
      courseName : '',
      courseCode: '',
      courseRoom: '',
      finalDate : '',
      finalStartTime : '',
      finalEndTime : '',
      midtermDate : '',
      midtermStartTime : '',
      midtermEndTime : '',

      courseSchedule : [],
      sun : [],
      mon : [],
      thu : [],
      wed : [],
      the : [],
      fri : [],
      sat : [],
      instructorModalPhoto: require('../img/icon/person.png'),
      adminState: false,

      viewCourseModal : false,
      courseViewReady : false,

    }

  }

  componentWillMount(){
    this.loadCourse();
  }

  leaveEditCourse = () => {
    if(!this.state.adminState){
      Alert.alert(
        'Want to leave course?',
        'Warning!, You will not be able to access any information from course',
          [
            {
              text: 'Cancel', onPress: () => null,
              style: 'cancel'
            },
            {
              text: 'Leave', onPress: () => this.deleteData()
            },
          ],
          {
            cancelable: true
          } )
    }else{
      Alert.alert('Edit')
    }
  }

  deleteData = () => {
    let userName = firebase.auth().currentUser.displayName;
    let userID = firebase.auth().currentUser.uid;
    firebase.database().ref('course/' + this.state.courseCode + '/courseMember/' + userName).remove().then(
      firebase.database().ref('users/' + userID + '/courseList/' + this.state.courseCode).remove().then( () => {
        this.setState({
          isReady: false,
          courseNameTask: [],
          courseCodeTask: [],
          course: null,
        })
        this.closeCourseView()
        this.loadCourse()
      })
    );

  }

  courseViewModal = () => {
    if(!this.state.courseViewReady){
      return(
        <View style={{
          flex: 1,
          height: null,
          width: null,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Text>Course Loading...</Text>
          <Image style={{width: 50, height: 50}} source={require('../img/icon/Loading_icon.gif')} />
        </View>
      )
    }
    return(
      <View style={styles.viewCourseContainer}>
            <Image style={styles.courseViewTitle} source={require('../img/classRoom.jpg')}>
                <View style={{marginTop: -10, marginBottom: 7}}>
                  <Text style={styles.courseNameView} numberOfLines={1}>{this.state.courseName}</Text>
                  <Text style={styles.courseCodeView} numberOfLines={1}>{this.state.courseCode}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <TouchableHighlight style={styles.editLeaveButton} onPress={() => this.leaveEditCourse()} underlayColor='rgba(200,200,200,0.4)'>
                    <Text style={styles.saveText}>
                      {this.state.adminState ? 'Edit' : 'Leave'}
                    </Text>
                  </TouchableHighlight>
                  <TouchableHighlight style={styles.saveButton} onPress={() => this.closeCourseView()} underlayColor='rgba(200,200,200,0.4)'>
                    <Text style={styles.saveText}>
                      {'OK'}
                    </Text>
                  </TouchableHighlight>
                </View>
            </Image>

          <ScrollView>
            <View style={{height: 900}}>
              <TouchableHighlight style={{marginTop: 10}} onPress={() => Alert.alert(
                'Instructor contact',
                'Email: ' + this.state.email +
                '\nFirstName: ' + this.state.firstName +
                '\nLastName: ' + this.state.lastName +
                '\nOfficeRoom: ' + this.state.officeRoom +
                '\nPhone: ' + this.state.phone
              )} underlayColor='transparent'>
                <View style={{flexDirection: 'row'}}>
                  <View style={styles.instructorPhoto}>
                    <Image source={this.state.instructorModalPhoto} style={styles.instructorPhotoText}></Image>
                  </View>
                  <View>
                    <View style={styles.instructorNameInputBorder}>
                      <Text style={styles.instructorNameInput}>{this.state.firstName}</Text>
                    </View>
                    <View style={styles.instructorNameInputBorder}>
                      <Text style={styles.instructorNameInput}>{this.state.lastName}</Text>
                    </View>
                  </View>
                </View>
              </TouchableHighlight>
              <View style={styles.courseViewDetail}>
                  <View>
                    <Text style={styles.setDetailText}>Room</Text>
                    <Text style={styles.completeSetDetail} numberOfLines={1}>{this.state.courseRoom}</Text>
                  </View>
                </View>
              <View style={styles.courseViewDetail}>
                  <View>
                    <Text style={styles.setDetailText}>Midterm</Text>
                    <Text style={styles.completeSetDetail} numberOfLines={1}>{this.state.midtermDate}</Text>
                    <Text style={styles.completeSetDetail}>{this.state.midtermStartTime + ' to ' + this.state.midtermEndTime}</Text>
                  </View>
              </View>
              <View style={styles.courseViewDetail}>
                  <View>
                    <Text style={styles.setDetailText}>Final</Text>
                    <Text style={styles.completeSetDetail} numberOfLines={1}>{this.state.finalDate}</Text>
                    <Text style={styles.completeSetDetail}>{this.state.finalStartTime + ' to ' + this.state.finalEndTime}</Text>
                  </View>
              </View>
              <View style={styles.courseViewDetail}>
                  <View>
                    <Text style={styles.setDetailText}>Schedule</Text>
                    {this.renderSchedule()}
                  </View>
              </View>
            </View>
          </ScrollView>
      </View>
    )
  }

  async courseView(courseCode){
    this.setState({viewCourseModal: true})
    const user = firebase.auth().currentUser;

    if(user != null){
      firebase.database().ref('course/' + courseCode + '/courseDetail').once('value').then((snapshot) => {
        let courseInstructor = snapshot.child('courseInstructor').val()
        let courseSchedule = snapshot.child('courseSchedule').val()
        let courseRoom = snapshot.child('courseRoom').val()
        let courseName = snapshot.child('courseName').val()
        let finalDate = snapshot.child('courseFinal').child('finalDate').val()
        let finalStartTime = snapshot.child('courseFinal').child('finalStartTime').val()
        let finalEndTime = snapshot.child('courseFinal').child('finalEndTime').val()
        let midtermDate = snapshot.child('courseMidterm').child('midtermDate').val()
        let midtermStartTime = snapshot.child('courseMidterm').child('midtermStartTime').val()
        let midtermEndTime = snapshot.child('courseMidterm').child('midtermEndTime').val()


        courseName != null ? this.setState({courseName : courseName}) : null
        courseRoom != null ? this.setState({courseRoom : courseRoom}) : null
        courseCode != null ? this.setState({courseCode : courseCode}) : null
        finalDate != null ? this.setState({finalDate : finalDate}) : null
        finalStartTime != null ? this.setState({finalStartTime : finalStartTime}) : null
        finalEndTime != null ? this.setState({finalEndTime : finalEndTime}) : null
        midtermDate != null ? this.setState({midtermDate : midtermDate}) : null
        midtermStartTime != null ? this.setState({midtermStartTime : midtermStartTime}) : null
        midtermEndTime != null ? this.setState({midtermEndTime : midtermEndTime}) : null


        if(courseSchedule != null){
          this.setState({
            sun : courseSchedule.sun,
            mon : courseSchedule.mon,
            thu : courseSchedule.thu,
            wed : courseSchedule.wed,
            the : courseSchedule.the,
            fri : courseSchedule.fri,
            sat : courseSchedule.sat
          })
        }

        let user = firebase.auth().currentUser;
        firebase.database().ref('course/' + courseCode + '/courseMember/' + user.uid).once('value').then((snapshot) => {
          if(snapshot.val() === 'Admin'){
            this.setState({adminState: true})
          }else {
            this.setState({adminState: false})
          }
        });

        firebase.database().ref('instructor/' + courseInstructor).once('value').then((snapshot) => {
          let email = snapshot.child('email').val()
          let firstName = snapshot.child('firstName').val()
          let lastName = snapshot.child('lastName').val()
          let officeRoom = snapshot.child('officeRoom').val()
          let phone = snapshot.child('phone').val()
          let instructorPhoto = snapshot.child('instructor_picture').val()

          email != null ? this.setState({email : email}) : null
          firstName != null ? this.setState({firstName : firstName}) : null
          lastName != null ? this.setState({lastName : lastName}) : null
          officeRoom != null ? this.setState({officeRoom : officeRoom}) : null
          phone != null ? this.setState({phone : phone}) : null
          instructorPhoto != null ? this.setState({ instructorModalPhoto: { uri: instructorPhoto } }) : null

          this.setState({courseViewReady: true})
        })
      })
    }
  }

  renderSchedule = () => {
    let sun;
    let mon;
    let thu;
    let wed;
    let the;
    let fri;
    let sat;
      if(this.state.sun != null){
        sun = this.state.sun.map((value, index) => {
          return(
            <View key={index}>
              <Text style={styles.completeSetDetail}>{'Sunday ' + value.firstHours + ':' + value.firstMinutes + ' to ' + value.lastHours + ':' + value.lastMinutes}</Text>
            </View>
          )
        })
      }
      if(this.state.mon != null){
        mon = this.state.mon.map((value, index) => {
          return (
            <View key={index}>
              <Text style={styles.completeSetDetail}>{'Monday ' + value.firstHours + ':' + value.firstMinutes + ' to ' + value.lastHours + ':' + value.lastMinutes}</Text>
            </View>
          )
        })
      }
      if(this.state.the != null){
        the = this.state.the.map((value, index) => {
          return(
            <View key={index}>
              <Text style={styles.completeSetDetail}>{'Tuesday ' + value.firstHours + ':' + value.firstMinutes + ' to ' + value.lastHours + ':' + value.lastMinutes}</Text>
            </View>
          )
        })
      }
      if(this.state.wed != null){
        wed = this.state.wed.map((value, index) => {
          return(
            <View key={index}>
              <Text style={styles.completeSetDetail}>{'Wednesday ' + value.firstHours + ':' + value.firstMinutes + ' to ' + value.lastHours + ':' + value.lastMinutes}</Text>
            </View>
          )
        })
      }
      if(this.state.thu != null){
        thu = this.state.thu.map((value, index) => {
          return(
            <View key={index}>
              <Text style={styles.completeSetDetail}>{'Thursday ' + value.firstHours + ':' + value.firstMinutes + ' to ' + value.lastHours + ':' + value.lastMinutes}</Text>
            </View>
          )
        })
      }
      if(this.state.fri != null){
        fri = this.state.fri.map((value, index) => {
          return(
            <View key={index}>
              <Text style={styles.completeSetDetail}>{'Friday ' + value.firstHours + ':' + value.firstMinutes + ' to ' + value.lastHours + ':' + value.lastMinutes}</Text>
            </View>
          )
        })
      }
      if(this.state.sat != null){
      sat = this.state.sat.map((value, index) => {
        return(
            <View key={index}>
              <Text style={styles.completeSetDetail}>{'Saturday ' + value.firstHours + ':' + value.firstMinutes + ' to ' + value.lastHours + ':' + value.lastMinutes}</Text>
            </View>
          )
        })
      }

      return [sun, mon, thu, wed, the, fri, sat]
  }

  joinCourse = (searchCourse, author, authorUid) => {

    const subjectsRef = firebase.database().ref('course/' + searchCourse);

    const subjectData = {
      author: author,
      authorUid: authorUid,
      title: 'Follow user want to join ' + searchCourse + ' course',
    };

    const newSubjectKey = subjectsRef.push().key;

    const updates = {};
    updates[`/joinrequest/${newSubjectKey}`] = subjectData;
    firebase.database().ref('course/' + searchCourse).update(updates);

    Toast.show('Sent requested');
  }

  deleteRequest = (requestId, searchCourse) => {
    console.log(requestId + '->>' + searchCourse)
    firebase.database().ref('course/' + searchCourse + '/joinrequest/' + requestId).remove().then(() => {
      Toast.show('Request canceled');
    })
  }

searchCourse = () => {
  const user = firebase.auth().currentUser;
  let searchCourse = this.state.searchCourseName;
  
  if(searchCourse.length < 5){
    Alert.alert('Course Code must contain 2 letter and 3 number')
  }else{
    if (this.state.courseCodeTask.indexOf(searchCourse) >= 0) {
      Alert.alert('Course Found', 'You already joined it');
    } else {

      if (user != null) {
        firebase.database().ref('course/' + searchCourse).once('value').then((snapshot) => {
          if (snapshot.val() !== null) {
            
            let requestStatus = snapshot.child('joinrequest');
            let requestSent = false;
            let requestId = '';

            requestStatus.forEach(request => {
              if(request.child('author').val() === user.displayName){
                requestSent = true
                requestId = request.key
              }
            })
            
            if(requestSent){
              Alert.alert(
                'Request already sent',
                'Delete sent Request?',
                [
                  {
                    text: 'Delete', onPress: () => this.deleteRequest(requestId, searchCourse),
                  },
                  {
                    text: 'Cancel', onPress: () => null,
                    style: 'cancel'
                  }
                ]
              )
            }else{
              Alert.alert(
                'Course Found',
                'Course with ' + searchCourse + ' CourseID was created',
                [
                  {
                    text: 'Cancel', onPress: () => null,
                    style: 'cancel'
                  },
                  {
                    text: 'Join', onPress: () => this.joinCourse(searchCourse, user.displayName, user.uid)
                  },
                ],
                {
                  cancelable: true
                })
            }
            
          } else {
            Alert.alert(
              'Course NotFound',
              'Course with ' + searchCourse + ' is not exist yet \n want to create new?',
              [
                {
                  text: 'Cancel', onPress: () => null,
                  style: 'cancel'
                },
                {
                  text: 'Yes', onPress: () => Actions.newcourse()
                },
              ],
              {
                cancelable: true
              })
          }
        })
      }
    }
  }
}

closeCourseView = () => {
  this.setState({
    viewCourseModal:false,
    courseViewReady: false,

    email : '',
    firstName : '',
    lastName : '',
    officeRoom : '',
    phone : '',

    courseInstructor : '',
    courseName : '',
    courseCode: '',
    courseRoom: '',
    finalDate : '',
    finalStartTime : '',
    finalEndTime : '',
    midtermDate : '',
    midtermStartTime : '',
    midtermEndTime : '',

    courseSchedule : [],
    sun : [],
    mon : [],
    thu : [],
    wed : [],
    the : [],
    fri : [],
    sat : [],
    adminState: false
  })
}

/* {
  test = () => {
    firebase.auth().signOut().then(function() {
      Alert.alert("Sign-Out","Successful");
    }).catch(function(error) {
      Alert.alert("Error");
  });
  }

}*/

  render() {
    if(!this.state.isReady){
      return (
        <View style={{
          flex: 1,
          height: null,
          width: null,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Image style={{width: 80, height: 80}} source={require('../img/logo2.png')} />
          <Image style={{width: 50, height: 50}} source={require('../img/icon/Loading_icon.gif')} />
        </View>
      )
    }
    return (
      <View style={styles.courseContainer}>
        <StatusBar
          hidden={false}
          backgroundColor='rgba(0,0,0,0.8)'
        />
        <View style={styles.headerContainer}>
          <View style={[styles.headMenuButtonContainer, { paddingBottom: 13, alignItems: 'center', justifyContent: 'center' }]}>
            <Text style={styles.headTitle}>Course</Text>
          </View>
          <TouchableHighlight style={[styles.doneButton, { marginLeft: Platform.OS === 'ios' ? 40 : 70 }]}
            onPress={() => Actions.mainscreen()}
            underlayColor="rgba(200,200,200,0.6)"
          >
            <Text style={{ color: 'orange', fontWeight: 'bold' }}>Done</Text>
          </TouchableHighlight>
        </View>
        <View style={{
          borderBottomWidth: 2,
          marginTop: -10,
          borderColor: 'rgba(0,0,0,0.2)',
        }}></View>
      <View style={styles.searchContainer}>
        <Image source={require('../img/icon/search.png')} style={styles.searchIcon}></Image>
        <TextInput style={styles.searchInput}
          underlineColorAndroid = 'transparent'
          placeholder='Search...'
          maxLength={5}
          returnKeyType='search'
          autoCapitalize='characters'
          placeholderTextColor='rgba(100,100,100,0.8)'
          onChangeText={(courseName) => this.setState({searchCourseName: (courseName)})}
          onSubmitEditing={() => this.searchCourse()}
        />
        <TouchableHighlight style={styles.searchButton} onPress={() => this.searchCourse()}>
          <Text>Search</Text>
        </TouchableHighlight>
      </View>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <TouchableHighlight style={styles.addNewButton} onPress={Actions.newcourse}>
            <Text style={styles.addNewText}>+ Add New Course</Text>
          </TouchableHighlight>
      </View>
      <ScrollView>
        {this.state.course}
        <View style={styles.hr}></View>
        <Image source={require('../img/logo2.png')} style={styles.logo}></Image>
      </ScrollView>

      <Modal
        animationType='fade'
        transparent={false}
        visible={this.state.viewCourseModal}
        onRequestClose={() => this.setState({viewCourseModal: false})}
      >
        {this.courseViewModal()}
      </Modal>

      </View>
    );
  }

  async loadCourse() {
    const user = firebase.auth().currentUser;
    this.setState({
      courseCodeTask: [],
      courseNameTask: [],
    })

    if(user != null){
      const rootRef = firebase.database().ref();
      const courseLoad = rootRef.child('users/' + user.uid + '/courseList');
      courseLoad.once('value', snap => {
        if(snap.val() != null){
          snap.forEach(snapCourse => {
            this.setState({
              courseCodeTask: this.state.courseCodeTask.concat([snapCourse.key]),
              courseNameTask: this.state.courseNameTask.concat([snapCourse.val()]),
            })
          })

          if (this.state.courseNameTask.length > 0) {
            const courseList = this.state.courseCodeTask.map((courseList, index) =>
              <View key={index} style={{ justifyContent: 'center', alignItems: 'center' }}>
                <TouchableHighlight style={styles.courseListContainer} onPress={() => this.courseView(courseList)}>
                  <View style={styles.courseNameCodeText}>
                    <Text style={styles.courseCodeText}>{courseList}</Text>
                    <Text style={styles.courseNameText} numberOfLines={1}>{this.state.courseNameTask[index]}</Text>
                  </View>
                </TouchableHighlight>
              </View>
            );

            this.setState({
              course: courseList,
              isReady: true
            })
          } else {
            this.setState({
              isReady: true
            })
          }

        } else {
          this.setState({
            isReady: true
          })
        }
      })
    }
    else {
      Actions.login();
    }
  }
}

export default Course;

/* {
firebase Rule----------------------------

{
  "rules": {
    "users" :{
      "$userDetail": {
        ".read": "auth.uid == $userDetail",
        ".write": "auth.uid == $userDetail",
      }
    },
    "course": {
      "$course_id": {
        "courseDetail" : {
          ".read": "data.parent().child('courseMember').child(auth.uid).exists()",
          ".write": "auth != null"
        },
        "courseMember": {
          ".write": "auth != null",
          ".read": "data.child(auth.uid).exists()"
        }
      }
    },
    "instructor": {
      ".write": "auth != null",
      ".read": "auth != null"
    }
  }
}

} */
