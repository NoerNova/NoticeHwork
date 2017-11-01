import React, { Component } from 'react';

import {
    View,
    TouchableHighlight,
    Text,
    Modal,
    TextInput,
    ScrollView, 
    Keyboard,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Platform,
    Alert
} from 'react-native';

import styles from '../styles/mainScreenStyle.js';

import * as firebase from 'firebase';
import firebaseConfig from './firebaseConfig';

import DateTimePicker from 'react-native-modal-datetime-picker';

import { Actions } from 'react-native-router-flux';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

class CreateNewTask extends Component {
    constructor(props){
        super(props);
        this.state = {
            newTaskTitle: '',
            newTaskDescription: '',
            priority: "NORMAL",
            prioritySet: false,
            newTaskComment: '',
            keyboardAvoidingViewBeheavior: 'padding',
            newTaskEdding: false,

            selectCourse: false,
            selectedCourse: '',
            datePickerVisible: false,
            dueDate: '',
            course: null,
            
        }
    }

    componentWillMount() {

        if (this.props.courseNameTask.length > 0) {
            const courseList = this.props.courseCodeTask.map((courseList, index) =>
                <View key={index}>
                    <TouchableHighlight style={styles.courseListContainer} onPress={() => this.setState({ selectedCourse: courseList, selectCourse: false })} underlayColor='transparent'>
                        <View style={styles.courseNameCodeText}>
                            <Text style={styles.courseCodeText} numberOfLines={1}>{courseList}       {this.props.courseNameTask[index]}</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            );

            this.setState({
                course: courseList,
                isReady: true
            })
        }

        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    _keyboardDidShow() {

    }
    _keyboardDidHide() {

    }

    handleDate = (date) => {
        var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var d = date.getDate() + ' ' + month[date.getMonth()] + ' ' + date.getFullYear();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTimeIOS = hours + ':' + minutes + ' ' + ampm;
        var strTimeAndroid = date.getHours() + ':' + date.getMinutes();
        var showTime = Platform.OS === 'ios' ? strTimeIOS : strTimeAndroid;


        this.setState({
            dueDate: d + " " + showTime,
            datePickerVisible: false,
        })

    }

    publicNewTask = () => {
        const user = firebase.auth().currentUser;
        const publicher = user.displayName;

        let descriptions = this.state.newTaskDescription
        let duedate = this.state.dueDate
        let priority = this.state.priority
        let comment = this.state.newTaskComment
        let publishby = publicher
        let course = this.state.selectedCourse

        if (this.state.selectedCourse !== '') {
            let taskPushKey = firebase.database().ref('course/' + this.state.selectedCourse + "/coursework").push().key
            Alert.alert(
                `Publish to ${this.state.selectedCourse}`,
                'By Press OK, will public new task to Course and anyone who subcribe course will see this.',
                [
                    {
                        text: 'Cancel', onPress: () => null,
                        style: 'cancel'
                    },
                    {
                        text: 'OK', onPress: () => {
                            firebase.database().ref('course/' + this.state.selectedCourse + "/coursework/" + taskPushKey).set({
                                descriptions: descriptions,
                                duedate: duedate,
                                priority: priority,
                                comment: comment,
                                publishby: publishby,
                                title: this.state.newTaskTitle
                            }),
                                firebase.database().ref('course/' + this.state.selectedCourse + '/courseMember').once('value', member => {
                                member.forEach(child => {
                                    firebase.database().ref('users/'+ child.key +'/coursework/' + taskPushKey).set({
                                        course: course,
                                        descriptions: descriptions,
                                        duedate: duedate,
                                        priority: priority,
                                        comment: comment,
                                        publishby: publishby,
                                        title: this.state.newTaskTitle,
                                        status: false
                                    })
                                })
                            })
                            , Alert.alert('Finish Publish'), this.setState({
                                newTaskModal: false,
                                newTaskDescription: '',
                                dueDate: '',
                                priority: 'NORMAL',
                                newTaskComment: '',
                                selectedCourse: ''
                            }), Actions.mainscreen();
                        }
                    },
                ],
                {
                    cancelable: true
                })
        } else {
            Alert.alert('Not selected Course', 'Please seleted course to save to.')
        }
    }

    render() {
        return(
            <View>
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <View>
                        <View style={styles.newTaskModalHead}>
                            <TouchableHighlight onPress={() => Actions.pop()} style={styles.newTaskHeadButton} underlayColor='rgba(200,200,200,0.6)'>
                                <Text style={{ color: 'orange' }}>Cancel</Text>
                            </TouchableHighlight>
                            <Text style={styles.newTaskText}>New Task</Text>
                            <View style={{ display: !this.state.newTaskEdding ? 'flex' : 'none' }}>
                                <TouchableHighlight onPress={() => this.publicNewTask()} style={styles.newTaskHeadButton} underlayColor='rgba(200,200,200,0.6)'>
                                    <Text style={{ color: 'orange' }}>Publish</Text>
                                </TouchableHighlight>
                            </View>
                            <View style={{ display: this.state.newTaskEdding ? 'flex' : 'none' }}>
                                <TouchableHighlight onPress={() => { Keyboard.dismiss(); this.setState({ newTaskEdding: false }) }} style={styles.newTaskHeadButton} underlayColor='rgba(200,200,200,0.6)'>
                                    <Text style={{ color: 'orange' }}>Done</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                        <ScrollView style={{height: 8000}}>
                            <KeyboardAwareScrollView
                                resetScrollToCoords={{ x: 0, y: 0 }}
                                scrollEnabled={false}
                                extraHeight={Platform.OS === 'ios' ? 50 : 130}
                            >
                                <View style={styles.newTaskTitleContainer}>
                                    <TextInput
                                        style={styles.newTaskTitleTextInput}
                                        underlineColorAndroid='transparent'
                                        autoCorrect={true}
                                        placeholder='Task Title'
                                        autoCapitalize="sentences"
                                        onFocus={() => this.setState({ keyboardAvoidingViewBeheavior: 'padding', newTaskEdding: true })}
                                        onChangeText={(newTaskTitle) => this.setState({ newTaskTitle })}
                                    />
                                </View>
                                <View style={{ borderBottomWidth: 2, borderBottomColor: 'rgba(200,200,200,0.6)', marginLeft: 20, marginRight: 20 }}></View>
                                <View style={styles.newTaskDesContainer}>
                                    <TextInput
                                        style={styles.newTaskDescTextInput}
                                        underlineColorAndroid='transparent'
                                        autoCorrect={true}
                                        placeholder='Description...'
                                        multiline={true}
                                        autoCapitalize="sentences"
                                        onFocus={() => this.setState({ keyboardAvoidingViewBeheavior: 'padding', newTaskEdding: true })}
                                        onChangeText={(newTaskDescription) => this.setState({ newTaskDescription })}
                                    />
                                </View>
                                <View style={{ borderBottomWidth: 2, borderBottomColor: 'rgba(200,200,200,0.6)', marginLeft: 20, marginRight: 20 }}></View>
                                <View style={styles.newTaskTitleContainer}>
                                    <TouchableHighlight onPress={() => this.setState({ selectCourse: true })} style={styles.newTaskDetailBar} underlayColor='transparent'>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text>Course                               {this.state.selectedCourse}</Text>
                                            <Text></Text>
                                        </View>
                                    </TouchableHighlight>
                                </View>
                                <View style={{ borderBottomWidth: 2, borderBottomColor: 'rgba(200,200,200,0.6)', marginLeft: 20, marginRight: 20 }}></View>
                                <View style={styles.newTaskTitleContainer}>
                                    <TouchableHighlight onPress={() => this.setState({ datePickerVisible: true })} style={styles.newTaskDetailBar} underlayColor='transparent'>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text>Due Date                         {this.state.dueDate}</Text>
                                            <Text></Text>
                                        </View>
                                    </TouchableHighlight>
                                    <DateTimePicker
                                        isVisible={this.state.datePickerVisible}
                                        datePickerModeAndroid='spinner'
                                        mode='datetime'
                                        onConfirm={this.handleDate}
                                        onCancel={() => this.setState({ datePickerVisible: false })}
                                    />
                                </View>
                                <View style={{ borderBottomWidth: 2, borderBottomColor: 'rgba(200,200,200,0.6)', marginLeft: 20, marginRight: 20 }}></View>
                                <TouchableHighlight style={[styles.taskPriority, {
                                    backgroundColor: this.state.priority === 'NORMAL' ? 'green' : this.state.priority === 'MEDIUM' ? 'orange' : 'red'
                                }]} onPress={() => this.setState({ prioritySet: true })}>
                                    <Text style={{ color: 'white' }}>{this.state.priority}</Text>
                                </TouchableHighlight>
                                <View style={{ borderBottomWidth: 2, borderBottomColor: 'rgba(200,200,200,0.6)', marginLeft: 20, marginRight: 20 }}></View>
                                <View style={styles.newTaskDesContainer}>
                                    <TextInput
                                        style={styles.newTaskDescTextInput}
                                        underlineColorAndroid='transparent'
                                        autoCorrect={true}
                                        placeholder='Comment'
                                        multiline={true}
                                        onFocus={() => this.setState({ keyboardAvoidingViewBeheavior: 'padding', newTaskEdding: true })}
                                        onChangeText={(newTaskComment) => this.setState({ newTaskComment })}
                                    />
                                </View>
                            </KeyboardAwareScrollView>
                        </ScrollView>
                    </View>
                </TouchableWithoutFeedback>
                <Modal
                    animationType='slide'
                    transparent={true}
                    visible={this.state.selectCourse}
                    onRequestClose={() => this.setState({ selectCourse: false })}
                >
                    <TouchableWithoutFeedback onPress={() => this.setState({ selectCourse: false })}>
                        <View style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                            <View style={{ height: 350, backgroundColor: 'white', marginTop: 350 }}>
                            <ScrollView style={{height: 8000}}>
                                {this.state.course}
                            </ScrollView>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>


                <Modal
                    animationType='slide'
                    transparent={true}
                    visible={this.state.prioritySet}
                    onRequestClose={() => this.setState({ prioritySet: false })}
                >
                    <TouchableWithoutFeedback onPress={() => this.setState({ prioritySet: false })}>
                        <View style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                            <View style={{ height: 350, backgroundColor: 'white', marginTop: 350 }}>
                                <TouchableHighlight style={styles.courseListContainer} onPress={() => this.setState({ priority: 'NORMAL', prioritySet: false })} underlayColor='transparent'>
                                    <Text style={styles.courseCodeText} numberOfLines={1}>Normal (Default)</Text>
                                </TouchableHighlight>
                                <TouchableHighlight style={styles.courseListContainer} onPress={() => this.setState({ priority: 'MEDIUM', prioritySet: false })} underlayColor='transparent'>
                                    <Text style={styles.courseCodeText} numberOfLines={1}>Medium</Text>
                                </TouchableHighlight>
                                <TouchableHighlight style={styles.courseListContainer} onPress={() => this.setState({ priority: 'HIGH', prioritySet: false })} underlayColor='transparent'>
                                    <Text style={styles.courseCodeText} numberOfLines={1}>High</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            </View>
        )
    }
}

export default CreateNewTask;