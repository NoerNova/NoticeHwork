import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  Alert,
  Platform,
  StatusBar,
  Image,
  StyleSheet,
  ScrollView,
  TextInput,
  Keyboard,
  Modal,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from 'react-native';
   
import { Calendar, Agenda } from 'react-native-calendars';
import * as firebase from 'firebase';
import firebaseConfig from './firebaseConfig.js';

import styles from '../styles/mainScreenStyle.js';

import {Actions} from 'react-native-router-flux';

import SegmentedControlTab from 'react-native-segmented-control-tab';

import PushController from "./PushController";
import { Card, Button, Icon, CheckBox } from 'react-native-elements';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Swipeout from 'react-native-swipeout';
import Prompt from 'react-native-prompt';

var date = new Date();
var month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var monthLess = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
var day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
var writeDateTime =
    month[date.getMonth()] + ' ' +
    date.getDate() + ' ' +
    date.getFullYear() + ', ' +
    'at ' +
    date.toLocaleTimeString();

const normal = { key: 'normal', color: 'green', selectedColor: 'orange' };
const medium = { key: 'medium', color: 'orange', selectedColor: 'orange' };
const high = { key: 'high', color: 'red', selectedColor: 'orange' };

class MainScreen extends Component {
  constructor() {
    super();
    this.state = {
      isReady: false,
      monthSelectStatus: true,
      todaySelectStatus: false,
      inprogressSelectStatus: true,
      completedSelectedStatus: false,
      calendarSelectStatus: true,
      checktaskSelectStatus: false,
      noteSelectStatus: false,
      friendsSelectStatus: false,
      courseSelectStatus: true,
      privateSelectStatus: false,
      todayDate: '',
      items:{},
      writeNoteDateTime: '',
      courseNoteModalVisible: false,
      courseNote: '',
      noteEdding: false,
      noteEddingDone: true,
      courseNoteDisplay: null,
      courseNoteDate: [],
      courseNoteDetail: [],
      courseNoteWriter: [],
      privateNoteDisplay: null,
      privateNoteDate: [],
      privateNoteDetail: [],
      selectCourse: false,
      selectedCourse:'',
      settingModal: false,
      monthTodaySelect: 0,
      completeInprogressSelect: 0,
      noteSegment: 0,
      courseCodeTask: [],
      courseNameTask: [],
      course: null,

      
      courseWorkTitle: [],
      courseWorkDetail: [],
      markedDay: {},
      markedDayIndex: '',

      friendsPicture: [],
      friendsName: [],
      friendsEmail: [],
      friendsFacebook: [],
      friendsLine: [],
      friendsPhone: [],
      friendsCourseList: [],
      friendsDisplay: null,
      
      showFriendsDetail: null,
      showNoteDetail: null,
      friendsDetailModel: false,
      noteDetailModel: false,
      checked: false,

      workListKey: [],
      workComment: [],
      workCourse: [],
      workDescriptions: [],
      workDueDate: [],
      workPriority: [],
      workPublishby: [],
      workStatus: [],
      workList: [],
      workListShow: null,

      workCompleteKey: [],
      workCompletedComment: [],
      workCompletedCourse: [],
      workCompletedDescriptions: [],
      workCompletedDueDate: [],
      workCompletedPriority: [],
      workCompletedPublishby: [],
      workCompletedStatus: [],
      workCompletedList: [],
      workCompletedListShow: null,

      viewTaskDetailModel: false,
      viewTaskDetail: null,
      newCommentPrompt: false,
      newComment: '',
      newCommentWorkKey: '',
      newCommentCourse: '',
    };
     this.onDayPress = this.onDayPress.bind(this);
  }

  componentWillMount() {
    const date = new Date();
    const strDate = date.getFullYear() + '-' + (("0" + (date.getMonth() + 1)).slice(-2)) + '-' + (("0" + (date.getDate())).slice(-2));
     if (!this.state.items[strDate]) {
          this.state.items[strDate] = [];
          this.setState({
            todayDate: strDate
          })
        }

        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
        this._cacheResourcesAsync();
  }


  componentWillUnmount () {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
   }

   _keyboardDidShow () {

    }
  _keyboardDidHide () {

   }

  onDayPress(day) {
    let markedDates = { ...this.state.markedDay }
    markedDates[day.dateString] = [{ selected: true }];
    this.setState({
      markedDay: markedDates
    })
  }

loadDay = (day) => {
  if (!this.state.items[day.dateString]) {
       this.state.items[day.dateString] = [];
     }
}

_monthTodaySelected = (index) => {
  if(index === 0){
    this.setState({
      monthSelectStatus: true,
      todaySelectStatus: false,
      monthTodaySelect: index
    })
  }else{
    this.setState({
      monthSelectStatus: false,
      todaySelectStatus: true,
      monthTodaySelect: index
    })
  }
}

  _completeInprogressSelect = (index) => {
    if (index === 0) {
      this.setState({
        inprogressSelectStatus: true,
        completedSelectedStatus: false,
        completeInprogressSelect: index
      })
    } else {
      this.setState({
        inprogressSelectStatus: false,
        completedSelectedStatus: true,
        completeInprogressSelect: index
      })
    }
  }

  _NoteSegment = (index) => {
    if(index === 0){
      this.setState({
        courseSelectStatus: true,
        privateSelectStatus: false,
        noteSegment: index,
        courseNoteModalVisible: false,
        noteEdding: false,
        writeNoteDateTime: '',
      })
      Keyboard.dismiss();
    }else{
      this.setState({
        courseSelectStatus: false,
        privateSelectStatus: true,
        noteSegment: index,
        courseNoteModalVisible: false,
        noteEdding: false,
        writeNoteDateTime: '',
      })
      Keyboard.dismiss();
    }
  }


_calendarMenuSelected = () => {
  if(!this.state.calendarSelectStatus){
    this.setState({
      calendarSelectStatus : true,
      checktaskSelectStatus : false,
      noteSelectStatus : false,
      friendsSelectStatus : false,
    })
  }
}

  _calendarMenuSelected = () => {
    if(!this.state.calendarSelectStatus){
      this.setState({
        calendarSelectStatus : true,
        checktaskSelectStatus : false,
        noteSelectStatus : false,
        friendsSelectStatus : false,
      })
    }
  }
  _checktaskMenuSelected = () => {
    if(!this.state.checktaskSelectStatus){
      this.setState({
        calendarSelectStatus : false,
        checktaskSelectStatus : true,
        noteSelectStatus : false,
        friendsSelectStatus : false,
      })
    }
  }
  _noteMenuSelected = () => {
    if(!this.state.noteSelectStatus){
      this.setState({
        calendarSelectStatus : false,
        checktaskSelectStatus : false,
        noteSelectStatus : true,
        friendsSelectStatus : false,
      })
    }
  }

  _friendMenuSelected = () => {
    if(!this.state.friendsSelectStatus){
      this.setState({
        calendarSelectStatus : false,
        checktaskSelectStatus : false,
        noteSelectStatus : false,
        friendsSelectStatus : true,
      })
    }
  }

  loadItems(day) {

  };


 renderItem(item) {
   return (
     <View style={[styles.item, {height: item.height}]}><Text>{item.name}</Text></View>
   );
 }

 renderEmptyDate() {
   return (
     <View style={styles.emptyDate}><Text>Nothing for today!</Text></View>
   );
 }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

 timeToString(time) {
   const date = new Date(time);
   const strDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
   return strDate
}

writenote = () => {
  date = new Date()
  writeDateTime =
    month[date.getMonth()] + ' ' +
    date.getDate() + ' ' +
    date.getFullYear() + ', ' +
    'at ' +
    date.toLocaleTimeString();

  this.setState({
    courseNoteModalVisible: true,
    noteEdding: true,
    writeNoteDateTime: writeDateTime,
  })
}

doneEdditNote = () => {
  Keyboard.dismiss();
  this.setState({
    noteEddingDone: true
  })
}

edditNote = () => {
  this.setState({
    noteEddingDone: false
  })
}

saveNote = () => {
  if(this.state.courseSelectStatus){
    this.setState({selectCourse: true})    
  }
  if (this.state.privateSelectStatus) {
    var user = firebase.auth().currentUser.uid;
    Alert.alert(
      'Save Private Note!',
      'Save this note to private note?',
      [
        {
          text: 'Cancel', onPress: () => null,
          style: 'cancel'
        },
        {
          text: 'OK', onPress: () => {
            const pushkey = firebase.database().ref('users/' + user + '/note').push().key;
            firebase.database().ref('users/' + user + '/note').child(pushkey).set({
              note: this.state.courseNote,
              date: writeDateTime
            }).then(
              this.setState({
                courseNoteModalVisible: false,
                noteEdding: false,
                writeNoteDateTime: '',
                courseNote: ''
              })
            )
          }
        },
      ],
      {
        cancelable: true
      })
  }
}

  saveCourseNote = (selectedCourse) => {
    var user = firebase.auth().currentUser;
    const pushkey = firebase.database().ref('course/' + selectedCourse + '/note').push().key;
    Alert.alert(
      'Save Public Note!',
      'Save this note to' + selectedCourse + 'note?',
      [
        {
          text: 'Cancel', onPress: () => null,
          style: 'cancel'
        },
        {
          text: 'OK', onPress: () => {
            this.setState({isReady: false})
            firebase.database().ref('course/' + selectedCourse + '/note').child(pushkey).set({
              date: writeDateTime,
              note: this.state.courseNote,
              writer: user.displayName
            }).then(
              this.setState({
                courseNoteModalVisible: false,
                noteEdding: false,
                writeNoteDateTime: '',
                courseNote: '',
                selectCourse: false
              })
            )
          }
        },
      ],
      {
        cancelable: true
      })
}

logout = () => {
  this.setState({settingModal: false})
  firebase.auth().signOut().then(() => {
    Alert.alert("Successful logout","We hope to see you soon,\n don't forget to done your HWork.\n:)")
    Actions.login();
  }).catch((error) => {
    Alert.alert("Error");
});
}

showFriendDetail = (friendsPicture, friendsName, friendsEmail, friendsFacebook, friendsLine, friendsPhone, friendsCourseList) => {
  const show = 
    <Card
      raised
      title={friendsName}
      image={friendsPicture}      
    >
      <View style={{ marginBottom: 10 }}>
        <Text style={styles.friendsNameDetailStyle}>Facebook: {friendsFacebook}</Text>
        <Text style={styles.friendsNameDetailStyle}>Line: {friendsLine}</Text>
        <Text style={styles.friendsNameDetailStyle}>Phone: {friendsPhone}</Text>
        <Text style={styles.friendsNameDetailStyle}>Email: {friendsEmail}</Text>
      </View>
      <Button
        icon={{ name: 'code' }}
        backgroundColor='#03A9F4'
        buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
        title='OK'
        onPress={() => this.setState({friendsDetailModel: false})} />
    </Card>;
  

  this.setState({
    showFriendsDetail: show
  })
}

  viewNoteDetail = (noteCourse,noteDate,noteDetail, noteWriter) => {
    const show =
      <Card
        raised
        title={noteCourse+"        "+noteWriter}
      >
        <View style={{ marginBottom: 10 }}>
          <Text style={styles.friendsNameDetailStyle}>{noteDetail}</Text>
          <Text style={styles.friendsNameDetailStyle}>{noteDate}</Text>
        </View>
        <Button
          icon={{ name: 'code' }}
          backgroundColor='#03A9F4'
          buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
          title='OK'
          onPress={() => this.setState({ noteDetailModel: false })} />
      </Card>;


    this.setState({
      showNoteDetail: show
    })
  }

  setWorkStatus = (index, status) => {
    let user = firebase.auth().currentUser;
    
    if(status){
      Alert.alert(
        'Return Notification',
        'This will start to notice you about this task again',
        [
          {
            text: 'Cancel', onPress: () => null,
            style: 'cancel'
          },
          {
            text: 'OK', onPress: () => {
              firebase.database().ref('users/' + user.uid + '/coursework/' + this.state.workCompleteKey[index]).update({
                status: false
              }).then(() => {
                let workCompletedStatus = this.state.workCompletedStatus

                workCompletedStatus[index] = false

                this.setState({
                  workCompletedStatus: workCompletedStatus,
                })

                if (this.state.workCompletedList.length > 0) {
                  const workList = this.state.workCompletedList.map((work, index) =>
                    <View key={index}>
                      <CheckBox
                        checked={this.state.workCompletedStatus[index]}
                        title={work + '         ' + this.state.workCompletedDueDate[index]}
                        iconType='material'
                        checkedIcon='check-circle'
                        uncheckedIcon='clear'
                        checkedColor='green'
                        uncheckedColor='red'
                        containerStyle={{ height: 50 }}
                        onLongPress={() => [this.viewTaskDetail(
                            this.state.workCompletedComment[index],
                            this.state.workCompletedCourse[index],
                            this.state.workCompletedDescriptions[index],
                            this.state.workCompletedDueDate[index],
                            this.state.workCompletedPriority[index],
                            this.state.workCompletedPublishby[index],
                            this.state.workCompletedStatus[index],
                            this.state.workCompletedList[index],
                            this.state.workCompleteKey[index]
                          ),
                          this.setState({ viewTaskDetailModel: true})]
                        }
                        onPress={() => this.setWorkStatus(index, true)}
                      />
                    </View>
                  );
                  this.setState({
                    workCompletedListShow: workList
                  })
                }
              })
            }
          }
        ],
        {
          cancelable: true
        }
      )

    }else{
      Alert.alert(
        'Finished Task',
        'This will not notice you about this task again',
        [
          {
            text: 'Cancel', onPress: () => null,
            style: 'cancel'
          },
          {
            text: 'OK', onPress: () => {
              firebase.database().ref('users/' + user.uid + '/coursework/' + this.state.workListKey[index]).update({
                status: true
              }).then(() => {
                let workStatus = { ...this.state.workStatus }

                workStatus[index] = true

                this.setState({
                  workStatus: workStatus,
                })
                if (this.state.workList.length > 0) {
                  const workList = this.state.workList.map((work, index) =>
                    <View key={index}>
                      <CheckBox
                        title={work + '         ' + this.state.workDueDate[index]}
                        iconType='material'
                        checkedIcon='check-circle'
                        uncheckedIcon='clear'
                        checkedColor='green'
                        uncheckedColor='red'
                        containerStyle={{ height: 50, flex: 1 }}
                        onLongPress={() => [this.viewTaskDetail(
                            this.state.workComment[index],
                            this.state.workCourse[index],
                            this.state.workDescriptions[index],
                            this.state.workDueDate[index],
                            this.state.workPriority[index],
                            this.state.workPublishby[index],
                            this.state.workStatus[index],
                            this.state.workList[index],
                            this.state.workListKey[index]
                          ),
                          this.setState({ viewTaskDetailModel: true})]
                        }
                        checked={this.state.workStatus[index]}
                        onPress={() => this.setWorkStatus(index, false)}
                      />
                    </View>
                  );
                  this.setState({
                    workListShow: workList
                  })
                }
              })
            }
          }
        ],
        {
          cancelable: true
        }
      )
    } 
  }

  commentR = (comment) => {
    const commentss = Object.keys(comment).map(key => {
      return (
        <View key={key} style={{width : 300, height: 50, flex: 1}}>
          <Text>{comment[key].comment}</Text>
          <Text>{comment[key].user}</Text>
          <Text>------------------------------</Text>
        </View>
      )
    })
    return commentss
  }

  viewTaskDetail = (comment, course, descriptions, dueDate, priority, publishby, status, title, workKey) => {

    const show = 
      <View>
        <View style={styles.viewTaskModalHead}>
          <TouchableHighlight onPress={() => this.setState({ 
            viewTaskDetailModel: false, 
            newCommentPrompt: true, 
            newCommentWorkKey:  workKey,
            newCommentCourse: course
            })} style={[styles.viewTaskHeadButton, { marginLeft: -15 }]} underlayColor='transparent'>
            <Text style={{ color: 'orange' }}>Comment</Text>
          </TouchableHighlight>
          <Text style={styles.viewTaskText}>Task</Text>
          <TouchableHighlight onPress={() => this.setState({ viewTaskDetailModel: false })} style={[styles.viewTaskHeadButton, { marginLeft: 20 }]} underlayColor='transparent'>
            <Text style={{ color: 'orange' }}>OK</Text>
          </TouchableHighlight>
        </View>
        <ScrollView>
          <View style={{ height: 800}}>
            <View style={styles.viewTaskTitleContainer}>
              <Text style={styles.viewTaskTitleText}>{title}</Text>
            </View>
            <View style={{ borderBottomWidth: 2, borderBottomColor: 'rgba(200,200,200,0.6)', marginLeft: 20, marginRight: 20 }}></View>
            <View style={styles.viewTaskDesContainer}>
              <Text style={styles.viewTaskDescText}>{descriptions}</Text>
            </View>
            <View style={{ borderBottomWidth: 2, borderBottomColor: 'rgba(200,200,200,0.6)', marginLeft: 20, marginRight: 20 }}></View>
            <View style={styles.viewTaskTitleContainer}>
              <Text style={styles.viewTaskDetailText}>Course                              {course}</Text>
            </View>
            <View style={{ borderBottomWidth: 2, borderBottomColor: 'rgba(200,200,200,0.6)', marginLeft: 20, marginRight: 20 }}></View>
            <View style={styles.viewTaskTitleContainer}>
              <Text style={styles.viewTaskDetailText}>Due Date                          {dueDate}</Text>
            </View>
            <View style={{ borderBottomWidth: 2, borderBottomColor: 'rgba(200,200,200,0.6)', marginLeft: 20, marginRight: 20 }}></View>
            <View style={[styles.taskPriority, {
              backgroundColor: priority === 'NORMAL' ? 'green' : priority === 'MEDIUM' ? 'orange' : 'red'
            }]} onPress={() => null}>
              <Text style={{ color: 'white' }}>{priority}</Text>
            </View>
            <View style={{ borderBottomWidth: 2, borderBottomColor: 'rgba(200,200,200,0.6)', marginLeft: 20, marginRight: 20 }}></View>
            <View style={styles.viewTaskDesContainer}>
              <Text style={styles.viewTaskDescText}>{this.commentR(comment)}</Text>
            </View>
          </View>
        </ScrollView>
      </View>;

      this.setState({viewTaskDetail: show})
  }

  newComment = (comment) => {
    Alert.alert(
      `Comment to ${this.state.newCommentCourse}`,
      'This will public to all member in course',
      [
        {
          text: 'Cancel', onPress: () => null,
          style: 'cancel'
        },
        {
          text: 'OK', onPress: () => {
            let user = firebase.auth().currentUser;
            let pushKey = firebase.database().ref('users/' + user.uid + '/coursework/' + this.state.newCommentWorkKey + '/comment').push().key;
            let coursePushKey = firebase.database().ref('course/' + this.state.newCommentCourse + '/coursework/' + this.state.newCommentWorkKey + '/comment').push().key;
            firebase.database().ref('users/' + user.uid + '/coursework/' + this.state.newCommentWorkKey + '/comment/' + pushKey).set({
              comment: comment,
              user: user.displayName
            })
            firebase.database().ref('course/' + this.state.newCommentCourse + '/coursework/' + this.state.newCommentWorkKey + '/comment/' + coursePushKey).set({
              comment: comment,
              user: user.displayName
            })
            this.setState({
              newComment: '',
              newCommentCourse: '',
              newCommentPrompt: false,
              viewTaskDetailModel: true,
              newCommentWorkKey: ''
            })
          }
        }
      ]
    )
  }


async _cacheResourcesAsync() {
  const user = firebase.auth().currentUser;

    const rootRef = firebase.database().ref();
    const course = rootRef.child('users/' + user.uid + '/courseList');
    course.once('value', snap => {
      if (snap.val() != null) {
        snap.forEach(child => {
          this.setState({
            courseCodeTask: this.state.courseCodeTask.concat([child.key]),
            courseNameTask: this.state.courseNameTask.concat([child.val()]),
          });

          if (this.state.courseNameTask.length > 0) {
            const courseList = this.state.courseCodeTask.map((courseList, index) =>
              <View key={index}>
                <TouchableHighlight style={styles.courseListContainer} onPress={() => this.saveCourseNote(courseList)} underlayColor='transparent'>
                  <View style={styles.courseNameCodeText}>
                    <Text style={styles.courseCodeText} numberOfLines={1}>{courseList}       {this.state.courseNameTask[index]}</Text>
                  </View>
                </TouchableHighlight>
              </View>
            );

            this.setState({
              course: courseList
            })
          }else{
            console.log('someTHine went wrong')

            this.setState({
              isReady: true
            })
          }
          

          rootRef.child('course/' + child.key + '/note').on('value', snap => {
            snap.forEach(snapNote => {
              this.setState({
                courseNoteDate: this.state.courseNoteDate.concat([snapNote.child('date').val()]),
                courseNoteDetail: this.state.courseNoteDetail.concat([snapNote.child('note').val()]),
                courseNoteWriter: this.state.courseNoteWriter.concat([snapNote.child('writer').val()]),
              })
            })

              if(this.state.courseNoteDate.length > 0) {
                this.setState({
                  courseNoteDate : this.state.courseNoteDate.reverse(),
                  courseNoteDetail : this.state.courseNoteDetail.reverse(),
                  courseNoteWriter : this.state.courseNoteWriter.reverse()
                })
                const courseNoteDisplay = this.state.courseNoteDate.map((note, index) => 
                  <View key={index}>
                    <Swipeout right={[{
                      text: 'Delete',
                      backgroundColor: 'red',
                      onPress: function () { Alert.alert('Delete?') },
                      autoClose: true
                    }]}
                      style={{ marginTop: 10 }}
                      disabled ={user.displayName !== this.state.courseNoteWriter[index]? true:false}
                    >
                      <TouchableHighlight onPress={() => {
                        [
                          this.viewNoteDetail(child.key, note, this.state.courseNoteDetail[index], this.state.courseNoteWriter[index]),
                          this.setState({ noteDetailModel: true })
                        ]
                      }}
                        underlayColor="rgba(200,200,200,0.3)"
                      >
                        <View style={{ height: 80, marginTop: 10 }}>
                          <Text style={styles.noteDetail} numberOfLines={1}>{this.state.courseNoteDetail[index]}</Text>
                          <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.noteDate}>{note}</Text>
                            <Text style={styles.noteWriter} numberOfLines={1}>{child.key}</Text>
                          </View>
                        </View>
                      </TouchableHighlight>
                    </Swipeout>
                  </View>
                );
                  
                this.setState({
                  courseNoteDisplay: courseNoteDisplay,
                  isReady: true
                })
              }else{
                this.setState({
                  isReady: true
                })
              }
          })
        })
      } else {
        this.setState({
          isReady: true
        })
      }
    })

    let dots = []

    rootRef.child('users/' + user.uid + '/coursework').on('value', snap => {
      if (snap.val() != null) {
        snap.forEach(snapchild => {

          let workKey = snapchild.key
          let title = snapchild.child('title').val();
          let duedate = snapchild.child('duedate').val();
          let priority = snapchild.child('priority').val();
          let status = snapchild.child('status').val();
          let descriptions = snapchild.child('descriptions').val();
          let publishby = snapchild.child('publishby').val();
          let comment = snapchild.child('comment').val();
          let course = snapchild.child('course').val();


          let getDueDate = new Date(duedate);
          let getMarkedDates = getDueDate.getFullYear() + "-" + (getDueDate.getMonth() + 1) + "-" + getDueDate.getDate();
          let getShowDueDate = day[getDueDate.getDay()] + ', ' + monthLess[(getDueDate.getMonth() + 1)] + ' ' + getDueDate.getDate();
          let markedDates = { ...this.state.markedDay }

          if(!status){
            this.setState({
              workListKey: this.state.workListKey.concat([workKey]),
              workComment: this.state.workComment.concat([comment]),
              workCourse: this.state.workCourse.concat([course]),
              workDescriptions: this.state.workDescriptions.concat([descriptions]),
              workDueDate: this.state.workDueDate.concat([getShowDueDate]),
              workPriority: this.state.workPriority.concat([priority]),
              workPublishby: this.state.workPublishby.concat([publishby]),
              workStatus: this.state.workStatus.concat([status]),
              workList: this.state.workList.concat([title]),
            })
          }else{
            this.setState({
              workCompleteKey: this.state.workCompleteKey.concat([workKey]),
              workCompletedComment: this.state.workCompletedComment.concat([comment]),
              workCompletedCourse: this.state.workCompletedCourse.concat([course]),
              workCompletedDescriptions: this.state.workCompletedDescriptions.concat([descriptions]),
              workCompletedDueDate: this.state.workCompletedDueDate.concat([getShowDueDate]),
              workCompletedPriority: this.state.workCompletedPriority.concat([priority]),
              workCompletedPublishby: this.state.workCompletedPublishby.concat([publishby]),
              workCompletedStatus: this.state.workCompletedStatus.concat([status]),
              workCompletedList: this.state.workCompletedList.concat([title]),


            })
          }

          if (this.state.workList.length > 0) {
            const workList = this.state.workList.map((work, index) =>
              <View key={index}>
                <CheckBox
                  title={work + '         ' + this.state.workDueDate[index]}
                  iconType='material'
                  checkedIcon='check-circle'
                  uncheckedIcon='clear'
                  checkedColor='green'
                  uncheckedColor='red'
                  containerStyle={{ height: 50, flex: 1 }}
                  onLongPress={() => [this.viewTaskDetail(
                      this.state.workComment[index],
                      this.state.workCourse[index],
                      this.state.workDescriptions[index],
                      this.state.workDueDate[index],
                      this.state.workPriority[index],
                      this.state.workPublishby[index],
                      this.state.workStatus[index],
                      this.state.workList[index],
                      this.state.workListKey[index]
                    ),
                      this.setState({ viewTaskDetailModel: true })]
                  }
                  checked={this.state.workStatus[index]}
                  onPress={() => this.setWorkStatus(index, false, this.state.workListKey[index])}
                />
              </View>
            );
            this.setState({
              workListShow: workList
            })
          }

          if (this.state.workCompletedList.length > 0) {
            const workList = this.state.workCompletedList.map((work, index) =>
              <View key={index}>
                <CheckBox
                  checked={this.state.workCompletedStatus[index]}
                  title={work + '         ' + this.state.workCompletedDueDate[index]}
                  iconType='material'
                  checkedIcon='check-circle'
                  uncheckedIcon='clear'
                  checkedColor='green'
                  uncheckedColor='red'
                  containerStyle={{ height: 50 }}
                  onLongPress={() => [this.viewTaskDetail(
                      this.state.workCompletedComment[index],
                      this.state.workCompletedCourse[index],
                      this.state.workCompletedDescriptions[index],
                      this.state.workCompletedDueDate[index],
                      this.state.workCompletedPriority[index],
                      this.state.workCompletedPublishby[index],
                      this.state.workCompletedStatus[index],
                      this.state.workCompletedList[index],
                      this.state.workCompleteKey[index]
                    ),
                      this.setState({ viewTaskDetailModel: true })]
                  }
                  onPress={() => this.setWorkStatus(index, true, this.state.workCompleteKey[index])}
                />
              </View>
            );
            this.setState({
              workCompletedListShow: workList
            })
          } 
          
          
          if(priority === 'NORMAL'){
            if (!dots.includes(normal)) {
              console.log('1')
              dots.concat(normal)
            } 
          }else if(priority === 'MEDIUM'){
            if (!dots.includes(medium)) {
              console.log('2')
              dots.concat(medium)
            }
          }else if(priority === 'HIGH'){
            if (!dots.includes(high)) {
              console.log('3')
              dots.concat(high)
            }
          }


          markedDates[getMarkedDates] = [{dots:  dots }]

          this.setState({
            markedDay: markedDates
          })
          

          let items = { ...this.state.items }

          items[getMarkedDates] = [{
            name: title + '\n' + descriptions + '\n' + publishby,
            height: Math.max(50, Math.floor(Math.random() * 150))
          }];

          const newItems = {};
          Object.keys(items).forEach(key => { newItems[key] = items[key]; });
          this.setState({
            items: newItems
          });
        })
      } else {
        console.log('NULL')
        this.setState({
          isReady: true
        })
      }
    })

    rootRef.child('users/' + user.uid + '/note').on('value', snap => {
      snap.forEach(snapNote => {
        this.setState({
          privateNoteDate: this.state.privateNoteDate.concat([snapNote.child('date').val()]),
          privateNoteDetail: this.state.privateNoteDetail.concat([snapNote.child('note').val()]),
        })
      })

        if (this.state.privateNoteDate.length > 0) {
          this.setState({
            privateNoteDate: this.state.privateNoteDate.reverse(),
            privateNoteDetail: this.state.privateNoteDetail.reverse()
          })
          const privateNoteDisplay = this.state.privateNoteDate.map((note, index) =>
            <View key={index}>
              <Swipeout right={[{
                text: 'Delete',
                backgroundColor: 'red',
                onPress: function () { Alert.alert('Delete?') },
                autoClose: true
              }]}
                style={{ marginTop: 10 }}
              >
                <TouchableHighlight onPress={() => {
                  [
                    this.viewNoteDetail("", note,this.state.privateNoteDetail[index],""),
                    this.setState({noteDetailModel: true})
                  ]}}
                  underlayColor="rgba(200,200,200,0.3)"
                >
                  <View style={{ height: 80, marginTop: 10 }}>
                    <Text style={styles.noteDetail} numberOfLines={1}>{this.state.privateNoteDetail[index]}</Text>
                    <Text style={styles.noteDate}>{note}</Text>
                  </View>
                </TouchableHighlight>
              </Swipeout>
            </View>
          );

          this.setState({
            privateNoteDisplay: privateNoteDisplay,
            isReady: true
          })
        }
    })

    rootRef.child('users/' + user.uid + '/friendsList').on('value', snap => {
      snap.forEach(snapFriend => {
        firebase.database().ref('users/' + snapFriend.key).once('value', snapshot => {
          if (snapshot.child('profile_picture').val() === null) {
            this.setState({
              friendsPicture: this.state.friendsPicture.concat([require("../img/icon/person.png")])
            })
          } else {
            this.setState({
              friendsPicture: this.state.friendsPicture.concat([{ uri: snapshot.child('profile_picture').val() }])
            })

          }

          this.setState({
            friendsName: this.state.friendsName.concat([snapshot.child('username').val()]),
            friendsEmail: this.state.friendsEmail.concat([snapshot.child('email').val()]),
            friendsFacebook: this.state.friendsFacebook.concat([snapshot.child('facebookId').val()]),
            friendsLine: this.state.friendsLine.concat([snapshot.child('lineId').val()]),
            friendsPhone: this.state.friendsPhone.concat([snapshot.child('phone').val()]),
            friendsCourseList: this.state.friendsCourseList.concat([snapshot.child('courseList').val()])

          })

          if (this.state.friendsName.length > 0) {
            const friendslist = this.state.friendsName.map((friends, index) =>
              <View key={index}>
                <TouchableHighlight style={styles.friendsContainer} onPress={() => {
                  [
                    this.showFriendDetail(
                      this.state.friendsPicture[index],
                      this.state.friendsName[index],
                      this.state.friendsEmail[index],
                      this.state.friendsFacebook[index],
                      this.state.friendsLine[index],
                      this.state.friendsPhone[index],
                      this.state.friendsCourseList[index]
                    )
                    , this.setState({ friendsDetailModel: true })]
                }}
                  underlayColor='transparent'>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={styles.friendsPhotoBorder}>
                      <Image
                        source={this.state.friendsPicture[index]}
                        style={styles.friendsPhoto}
                      />
                    </View>
                    <View>
                      <View style={styles.friendsNameStyleBorder}>
                        <Text style={styles.friendsNameStyle}>{friends}</Text>
                      </View>
                      <View
                        style={{ display: this.state.friendsFacebook[index] !== null ? 'flex' : 'none' }}>
                        <Text style={styles.friendsNameDetailStyle}>Facebook: {this.state.friendsFacebook[index]}</Text>
                      </View>
                      <View
                        style={{ display: this.state.friendsLine[index] !== null ? 'flex' : 'none' }}>
                        <Text style={styles.friendsNameDetailStyle}>Line: {this.state.friendsLine[index]}</Text>
                      </View>
                      <View
                        style={{ display: this.state.friendsFacebook[index] === null || this.state.friendsLine === null ? 'flex' : 'none' }}>
                        <Text style={styles.friendsNameDetailStyle}>Phone: {this.state.friendsPhone[index]}</Text>
                      </View>
                      <View
                        style={{ display: (this.state.friendsFacebook[index] === null || this.state.friendsLine === null) && this.state.friendsPhone === null ? 'flex' : 'none' }}>
                        <Text style={styles.friendsNameDetailStyle}>Email: {this.state.friendsEmail[index]}</Text>
                      </View>
                    </View>
                  </View>
                </TouchableHighlight>
              </View>
            );

            this.setState({
              friendsDisplay: friendslist,
              isReady: true
            })
          }
        })
      })
    })
}


  render() {
    if (!this.state.isReady) {
      return (
        <View style={{
          flex: 1,
          height: null,
          width: null,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Text>Loading All data...</Text>
          <Image style={{ width: 50, height: 50 }} source={require('../img/icon/Loading_icon.gif')} />
        </View>
      )
    }
    return(
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
          <PushController />
        <StatusBar
            hidden={false}
            backgroundColor='rgba(0,0,0,0.8)'
        />
        <View style={styles.headerContainer}>
          <View style={{display: this.state.noteSelectStatus && this.state.noteEdding? 'flex':'none'}}>
            <TouchableHighlight style={[styles.settingMenu, {position: 'absolute', marginLeft: -8}]}
                onPress={() => this.setState({
                  courseNoteModalVisible: false,
                  noteEdding: false,
                  writeNoteDateTime: '',
                })}
              underlayColor="rgba(200,200,200,0.6)"
            >
              <Text style={{color: 'orange', fontWeight: 'bold' }}> Back </Text>
            </TouchableHighlight>
          </View>



          <View style={{display: this.state.calendarSelectStatus? 'flex':'none'}}>
            <TouchableHighlight style={[styles.settingMenu, {position: 'absolute', marginLeft: -5}]}
                onPress={() => Actions.createNewTask({courseCodeTask: this.state.courseCodeTask, courseNameTask: this.state.courseNameTask})}
              underlayColor="rgba(200,200,200,0.6)"
            >
              <Image source={require('../img/icon/addevent.png')} style={styles.settingIcon}></Image>
            </TouchableHighlight>
          </View>



          <View style={{display: this.state.calendarSelectStatus? 'flex':'none'}}>
            <View style={styles.headMenuButtonContainer}>
              <SegmentedControlTab
                values={['Month', 'Today']}
                selectedIndex={this.state.monthTodaySelect}
                onTabPress={this._monthTodaySelected}
              />
            </View>
          </View>

          <View style={{ display: this.state.checktaskSelectStatus ? 'flex' : 'none' }}>
            <View style={[styles.headMenuButtonContainer, {marginBottom: 10}]}>
              <SegmentedControlTab
                values={['Inprogress', 'Completed']}
                selectedIndex={this.state.completeInprogressSelect}
                onTabPress={this._completeInprogressSelect}
                tabsContainerStyle= {{width: 150, marginLeft: -25}}
              />
            </View>
          </View>

          <View style={{display: this.state.noteSelectStatus? 'flex':'none'}}>
            <View style={[styles.headMenuButtonContainer, {paddingBottom: 11}]}>
              <SegmentedControlTab
                values={['Course', 'Private']}
                selectedIndex={this.state.noteSegment}
                onTabPress={this._NoteSegment}
              />
            </View>
          </View>

          <View style={{ display: this.state.friendsSelectStatus ? 'flex' : 'none' }}>
            <View style={[styles.headMenuButtonContainer, { paddingBottom: 13, alignItems: 'center', justifyContent: 'center' }]}>
              <Text style={styles.friendsHead}>Friends</Text>
            </View>
          </View>

          <View style={{display: this.state.calendarSelectStatus? 'flex':'none'}}>
            <TouchableHighlight style={styles.settingMenu}
              onPress={() => this.setState({settingModal: true})}
              underlayColor="rgba(200,200,200,0.6)"
            >
              <Image source={require('../img/icon/settings.png')} style={styles.settingIcon}></Image>
            </TouchableHighlight>
          </View>
          <View style={{display: this.state.noteSelectStatus && !this.state.noteEdding? 'flex':'none'}}>
            <TouchableHighlight style={styles.settingMenu}
              onPress={() => this.writenote()}
              underlayColor="rgba(200,200,200,0.6)"
            >
              <Image source={require('../img/icon/writenote.png')} style={styles.writenoteIcon}></Image>
            </TouchableHighlight>
          </View>
          <View style={{display: this.state.noteSelectStatus && this.state.noteEdding && !this.state.noteEddingDone? 'flex':'none'}}>
            <TouchableHighlight style={[styles.settingMenu, {marginLeft: Platform.OS === 'ios'? 40:70}]}
              onPress={() => this.doneEdditNote()}
              underlayColor="rgba(200,200,200,0.6)"
            >
              <Text style={{color: 'orange', fontWeight: 'bold' }}>Done</Text>
            </TouchableHighlight>
          </View>

          <View style={{ display: this.state.noteSelectStatus && this.state.noteEdding && 
              this.state.noteEddingDone && this.state.courseSelectStatus && (this.state.courseNote !== '') ? 'flex' : 'none' }}>
            <TouchableHighlight style={[styles.settingMenu, { marginLeft: Platform.OS === 'ios' ? 40 : 70 }]}
              onPress={() => this.saveNote()}
              underlayColor="rgba(200,200,200,0.6)"
            >
              <Text style={{ color: 'orange', fontWeight: 'bold' }}>Public</Text>
            </TouchableHighlight>
          </View>
          <View style={{ display: this.state.noteSelectStatus && this.state.noteEdding && 
              this.state.noteEddingDone && this.state.privateSelectStatus && (this.state.courseNote !== '') ? 'flex' : 'none' }}>
            <TouchableHighlight style={[styles.settingMenu, { marginLeft: Platform.OS === 'ios' ? 40 : 70 }]}
              onPress={() => this.saveNote()}
              underlayColor="rgba(200,200,200,0.6)"
            >
              <Text style={{ color: 'orange', fontWeight: 'bold' }}>Save</Text>
            </TouchableHighlight>
          </View>

        </View>
          <ScrollView>
            <View style={{display: this.state.monthSelectStatus&&this.state.calendarSelectStatus? 'flex':'none'}}>
              <Calendar
                style={styles.calendar}
                onDayPress={this.onDayPress}
                theme={{
                  calendarBackground: '#ffffff',
                  textSectionTitleColor: '#b6c1cd',
                  selectedDayBackgroundColor: '#00adf5',
                  selectedDayTextColor: '#ffffff',
                  todayTextColor: '#00adf5',
                  dayTextColor: '#2d4150',
                  textDisabledColor: '#d9e1e8',
                  dotColor: '#00adf5',
                  selectedDotColor: '#ffffff',
                  arrowColor: 'orange',
                  monthTextColor: '#00adf5',
                  textDayFontSize: 16,
                  textMonthFontSize: 16,
                  textDayHeaderFontSize: Platform.OS === 'ios'? 14:16
                }}
                markedDates={this.state.markedDay}
                markingType={'multi-dot'}
                
              />
            </View>
            <View style={{display: this.state.todaySelectStatus&&this.state.calendarSelectStatus? 'flex':'none'}}>
              <Agenda
                  items={this.state.items}
                  renderItem={this.renderItem.bind(this)}
                  renderEmptyDate={this.renderEmptyDate.bind(this)}
                  rowHasChanged={this.rowHasChanged.bind(this)}
                  onDayPress={(day)=> {this.loadDay(day)}}
                  minDate={this.state.todayDate}
                  maxDate={'2027-05-30'}
                  selected={this.state.todayDate}
                  markedDates={this.state.markedDay}
              />
            </View>

            <View style={{ display: this.state.checktaskSelectStatus && this.state.inprogressSelectStatus ? 'flex' : 'none' }}>
                {this.state.workListShow}
            </View>
            <View style={{ display: this.state.checktaskSelectStatus && this.state.completedSelectedStatus ? 'flex' : 'none' }}>
              {this.state.workCompletedListShow}
            </View>
            <Modal
              animationType='fade'
              transparent={false}
              visible={this.state.viewTaskDetailModel}
              onRequestClose={() => this.setState({ viewTaskDetailModel: false })}
            >
              <View style={styles.viewTaskModalContainer}>
                <View style={{ marginTop: 20 }}>
                  {this.state.viewTaskDetail}
                </View>
              </View>
            </Modal>

            <Prompt
              title="Comment"
              placeholder='........'
              promptStyle={{marginTop: 40}}
              visible={this.state.newCommentPrompt}
              textInputProps={{ autoCapitalize: 'sentences', width: null, height: 150, multiline: true }}
              onCancel={() => this.setState({ newCommentPrompt: false, viewTaskDetailModel: true })}
              onSubmit={(value) => this.newComment(value)}
              submitText='Post'
            />


            <View style={{display: this.state.noteSelectStatus? 'flex':'none'}}>
              <KeyboardAwareScrollView
                resetScrollToCoords={{ x: 0, y: 0 }}
                scrollEnabled={true}
                extraHeight={Platform.OS === 'ios' ? 50 : 500}
              >


              <View style={{display: !this.state.courseNoteModalVisible? 'flex':'none'}}>
                <View style={{ display: this.state.courseSelectStatus? 'flex':'none'}}>
                    {this.state.courseNoteDisplay}
                </View>
                <View style={{ display: this.state.privateSelectStatus ? 'flex' : 'none' }}>
                    {this.state.privateNoteDisplay}
                </View>
                <Modal
                  animationType='fade'
                  transparent={true}
                  visible={this.state.noteDetailModel}
                  onRequestClose={() => this.setState({ noteDetailModel: false })}
                >
                  <View style={styles.noteViewModel}>
                      <View style={{ marginTop: 100 }}>
                        {this.state.showNoteDetail}
                      </View>
                  </View>
                </Modal>
              </View>

              <View style={{display: this.state.courseNoteModalVisible? 'flex':'none'}}>
                <View style={styles.writenoteModalContainer}>
                  <View style={{alignItems: 'center'}}>
                    <Text style={styles.writeNoteTimeText}>{writeDateTime}</Text>
                  </View>
                  <View style={{flex: 1}}>
                    <TextInput
                      style={styles.writeNoteArea}
                      underlineColorAndroid='transparent'
                      autoCapitalize='sentences'
                      autoCorrect={true}
                      placeholder='Note...'
                      multiline={true}
                      onFocus={() => this.edditNote()}
                      value={this.state.courseNote}
                      onChangeText={(courseNote) => this.setState({courseNote})}
                    />
                  </View>
                </View> 
              </View>
              </KeyboardAwareScrollView>
            </View>

            <Modal
              animationType='slide'
              transparent={true}
              visible={this.state.selectCourse}
              onRequestClose={() => this.setState({ selectCourse: false })}
            >
              <TouchableWithoutFeedback onPress={() => this.setState({ selectCourse: false })}>
                <View style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                  <View style={{ height: 350, backgroundColor: 'white', marginTop: 350 }}>
                    <ScrollView>
                      {this.state.course}
                    </ScrollView>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </Modal>


            <View style={{display: this.state.friendsSelectStatus? 'flex':'none'}}>
              {this.state.friendsDisplay}
            </View>
            <Modal
              animationType='fade'
              transparent={true}
              visible={this.state.friendsDetailModel}
              onRequestClose={() => this.setState({ friendsDetailModel: false })}
            >
              <View style={styles.noteViewModel}>
                <View style={{marginTop: 80}}>
                  {this.state.showFriendsDetail}
                </View>
              </View>
            </Modal>

            
          </ScrollView>

        <View style={styles.footContainer}>
          <TouchableHighlight
              style={this.state.calendarSelectStatus? styles.footMenuSelectStyle : styles.footMenuUnSelectedStyle}
              onPress={() => this._calendarMenuSelected()}
              underlayColor="rgba(200,200,200,0.6)"
          >
            <Image source={require('../img/icon/calendar_menu.png')} style={styles.footIcon}></Image>
          </TouchableHighlight>
          <TouchableHighlight
              style={this.state.checktaskSelectStatus? styles.footMenuSelectStyle : styles.footMenuUnSelectedStyle}
              onPress={() => this._checktaskMenuSelected()}
              underlayColor="rgba(200,200,200,0.6)"
          >
            <Image source={require('../img/icon/checktask_menu.png')} style={styles.footIcon}></Image>
          </TouchableHighlight>
          <TouchableHighlight
              style={this.state.noteSelectStatus? styles.footMenuSelectStyle : styles.footMenuUnSelectedStyle}
              onPress={() => this._noteMenuSelected()}
              underlayColor="rgba(200,200,200,0.6)"
          >
            <Image source={require('../img/icon/note_menu.png')} style={styles.footIcon}></Image>
          </TouchableHighlight>
          <TouchableHighlight
              style={this.state.friendsSelectStatus? styles.footMenuSelectStyle : styles.footMenuUnSelectedStyle}
              onPress={() => this._friendMenuSelected()}
              underlayColor="rgba(200,200,200,0.6)"
          >
            <Image source={require('../img/icon/friends_menu.png')} style={styles.footIcon}></Image>
          </TouchableHighlight>
        </View>
        <Modal
          animationType='slide'
          transparent={true}
          visible={this.state.settingModal}
          onRequestClose={() => this.setState({settingModal: false})}
        >
          <TouchableWithoutFeedback onPress={() => this.setState({ settingModal: false })}>
            <View style={styles.settingContainer}>
              <View style={styles.settingListContainer}>
                <TouchableHighlight
                  style={styles.settingList}
                    onPress={() => {Actions.accountsetting(); this.setState({settingModal: false})}}
                  underlayColor="rgba(200,200,200,0.6)"
                >
                  <View style={{ flexDirection: 'row' }}>
                    <Image source={require('../img/icon/users.png')} style={styles.settingListIcon}></Image>
                    <Text style={styles.settingListText}>Account</Text>
                  </View>
                </TouchableHighlight>
                <TouchableHighlight
                  style={styles.settingList}
                  onPress={() => Alert.alert('Chart')}
                  underlayColor="rgba(200,200,200,0.6)"
                >
                  <View style={{flexDirection: 'row'}}>
                    <Image source={require('../img/icon/pie-chart.png')} style={styles.settingListIcon}></Image>
                    <Text style={styles.settingListText}>Chart</Text>
                  </View>
                </TouchableHighlight>
                <TouchableHighlight
                  style={styles.settingList}
                  onPress={() => {Actions.course(); this.setState({settingModal: false})}}
                  underlayColor="rgba(200,200,200,0.6)"
                >
                  <View style={{flexDirection: 'row'}}>
                    <Image source={require('../img/icon/blackboard.png')} style={styles.settingListIcon}></Image>
                    <Text style={styles.settingListText}>Add more Course</Text>
                  </View>
                </TouchableHighlight>
                <TouchableHighlight
                  style={styles.settingList}
                  onPress={() => this.logout()}
                  underlayColor="rgba(200,200,200,0.6)"
                >
                  <View style={{flexDirection: 'row'}}>
                    <Image source={require('../img/icon/logout.png')} style={styles.settingListIcon}></Image>
                    <Text style={styles.settingListText}>Log out</Text>
                  </View>
                </TouchableHighlight>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
      </TouchableWithoutFeedback>
    )
  }
}

export default MainScreen;
