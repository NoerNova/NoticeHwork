import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
    TextInput,
    TouchableHighlight,
    Platform,
    Alert,
    Modal
} from 'react-native';

import styles from '../styles/accountSettingStyle.js';

import { Actions } from 'react-native-router-flux';
import ImagePicker from 'react-native-image-picker'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as firebase from 'firebase';
import firebaseConfig from './firebaseConfig.js';

import Toast from 'react-native-simple-toast';
import RNFetchBlob from 'react-native-fetch-blob';

const storage = firebase.storage();

const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob


class AccountSetting extends Component {
    constructor(){
        super();
        this.state = {
            userName: '',
            userUid: '',
            phone: '',
            email: '',
            facebook: '',
            lineId: '',
            password: '',
            confirmPasswd: '',
            profile_picture: require("../img/icon/person.png"),
            isReady: false,
            resetPasswordModal: false,
            uri: '',
            uploadURL: ''
        }
    }

    componentWillMount() {
        this.loadProfile();
    }

    _pickProfilePhoto = async () => {

        let options = {
            title: 'Select Profile Picture',
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
                    uploadURL: response.uri,
                    profile_picture: { uri: 'data:image/jpeg;base64,' + response.data }
                });
            }
        });
    }

    uploadImage = (uri, mime = 'image/jpg') => {
        return new Promise((resolve, reject) => {
            const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
            let uploadBlob = null
            let imageName = this.state.userUid
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
                    firebase.database().ref('users/' + this.state.userUid).update({
                        profile_picture: url
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


    async loadProfile() {
        const user = firebase.auth().currentUser;

        firebase.database().ref("users/" + user.uid).once('value', snapshot => {
            if(snapshot.child('username').val() !== null){
                this.setState({userName: snapshot.child('username').val()})
            }
            if (snapshot.child('phone').val() !== null) {
                this.setState({ phone: snapshot.child('phone').val() })
            }
            if (snapshot.child('email').val() !== null) {
                this.setState({ email: snapshot.child('email').val() })
            }
            if (snapshot.child('facebookId').val() !== null) {
                this.setState({ facebook: snapshot.child('facebookId').val() })
            }
            if (snapshot.child('lineId').val() !== null) {
                this.setState({ lineId: snapshot.child('lineId').val() })
            }
            if (snapshot.child('password').val() !== null) {
                this.setState({ password: snapshot.child('password').val() })
            }
            if (snapshot.child('profile_picture').val() !== null) {
                this.setState({ profile_picture: { uri: snapshot.child('profile_picture').val() } })
            }
        })

        this.setState({isReady: true})
    }

    accountSave = () => {
        Alert.alert(
            'Confirm',
            'Confirm to edit your account',
            [
                {
                    text: 'Cancel', onPress: () => null,
                    style: 'cancel'
                },
                {
                    text: 'OK', onPress: () => {
                        this.setState({isReady: false})
                        const user = firebase.auth().currentUser;
                        user.updateProfile({
                            displayName: this.state.userName
                        })
                        this.setState({ userUid: user.uid});
                        if(this.state.uploadURL !== ''){
                            this.uploadImage(this.state.uploadURL);
                        }
                        firebase.database().ref('users/' + this.state.user).update({
                            email: this.state.email,
                            username: this.state.userName,
                            phone: this.state.phone,
                            facebookId: this.state.facebook,
                            lineId: this.state.lineId,
                        })
                        Actions.pop()
                        Toast.show('Successful update profile.')
                    }
                },
            ],
            {
                cancelable: true
            })
    }

    resetPassword = () => {
        this.setState({isReady: false})
        if (this.state.password !== '' && this.state.confirmPasswd !== '') {
            if (this.state.password === this.state.confirmPasswd) {
                const user = firebase.auth().currentUser;

                user.updatePassword(this.state.confirmPasswd).then(() => {
                    Alert.alert("Successful", "you now change to new password, please login again with new password")
                    this.setState({ resetPasswordModal: true })
                    this.setState({ isReady: true })
                    firebase.auth().signOut().then(() => {                        
                        Actions.login();
                    }).catch((error) => {
                        Alert.alert("Error");
                        this.setState({ isReady: true })
                    });
                }).catch((error) => {
                    Alert.alert('Error!', 'Something was going wrong, please try again later');
                    console.log(error)
                    this.setState({ isReady: true })
                });
            }else{
                Alert.alert(
                    'Password miss match!',
                    'Please reconfirmation password'
                );
                this.setState({ isReady: true })
            }
        }else{
            Alert.alert('Failed!', 'Please Enter Password and Confirm password before presses OK.');
            this.setState({ isReady: true })
        }
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
                    <Image style={{ width: 80, height: 80 }} source={require('../img/logo2.png')} />
                    <Image style={{ width: 50, height: 50 }} source={require('../img/icon/Loading_icon.gif')} />
                </View>
            )
        }

        return(
            <KeyboardAwareScrollView
                resetScrollToCoords={{ x: 0, y: 0 }}
                scrollEnabled={true}
                extraHeight={Platform.OS === 'ios' ? 50 : 500}
            >
                <View style={styles.accountContainer}>
                    <Image style={styles.accountTitle} blurRadius={Platform.OS === 'ios' ? 10 : 5} source={require('../img/tb2.jpg')}>
                        <View style={{ flexDirection: 'row', marginTop: 40 }}>
                            <TouchableHighlight style={styles.accountPhoto} onPress={this._pickProfilePhoto} underlayColor="rgba(200,200,200,0.4)">
                                <Image source={this.state.profile_picture} style={styles.accountPhotoText}></Image>
                            </TouchableHighlight>
                            <View>
                                <View style={styles.accountNameInputBorder}>
                                    <TextInput
                                        style={styles.accountNameInput}
                                        underlineColorAndroid='transparent'
                                        value={this.state.userName}
                                        placeholder='User Name'
                                        placeholderTextColor="white"
                                        returnKeyType='done'
                                        autoCapitalize='words'
                                        multiline={false}
                                        numberOfLines={1}
                                        onChangeText={(userName) => this.setState({ userName })}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View>
                            <TouchableHighlight style={styles.cancelButton} onPress={() => Actions.pop()}>
                                <Text style={styles.saveText}>
                                    {'cancel'}
                                </Text>
                            </TouchableHighlight>
                            </View>
                            <View>
                            <TouchableHighlight style={styles.saveButton} onPress={() => this.accountSave()}>
                                <Text style={styles.saveText}>
                                    {'save'}
                                </Text>
                            </TouchableHighlight>
                            </View>
                        </View>
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

                    <View style={{ marginTop: 20 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Image style={styles.icon} source={require('../img/icon/call.png')} />
                            <View style={styles.accountDetailBorder}>
                                <TextInput
                                    style={styles.accountDetailInput}
                                    underlineColorAndroid='transparent'
                                    placeholder='Phone'
                                    value={this.state.phone}
                                    placeholderTextColor="#aaaaaa"
                                    returnKeyType='next'
                                    keyboardType={'numeric'}
                                    multiline={false}
                                    numberOfLines={1}
                                    onChangeText={(phone) => this.setState({ phone })}
                                />
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Image style={styles.icon} source={require('../img/icon/email.png')} />
                            <View style={styles.accountDetailBorder}>
                                <TextInput
                                    style={styles.accountDetailInput}
                                    underlineColorAndroid='transparent'
                                    placeholder='Email'
                                    placeholderTextColor="#aaaaaa"
                                    autoCapitalize='none'
                                    keyboardType="email-address"
                                    multiline={false}
                                    numberOfLines={1}
                                    value={this.state.email}
                                    onChangeText={(email) => this.setState({ email })}
                                />
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Image style={styles.icon} source={require('../img/icon/facebook-logo.png')} />
                            <View style={styles.accountDetailBorder}>
                                <TextInput
                                    style={styles.accountDetailInput}
                                    underlineColorAndroid='transparent'
                                    placeholder='Facebook'
                                    autoCapitalize='none'
                                    value={this.state.facebook}
                                    placeholderTextColor="#aaaaaa"
                                    multiline={false}
                                    numberOfLines={1}
                                    onChangeText={(facebook) => this.setState({ facebook })}
                                />
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Image style={styles.icon} source={require('../img/icon/line.png')} />
                            <View style={styles.accountDetailBorder}>
                                <TextInput
                                    style={styles.accountDetailInput}
                                    underlineColorAndroid='transparent'
                                    placeholder= 'LineID'
                                    autoCapitalize='none'
                                    value={this.state.lineId}
                                    placeholderTextColor="#aaaaaa"
                                    multiline={false}
                                    numberOfLines={1}
                                    onChangeText={(lineId) => this.setState({ lineId })}
                                />
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Image style={styles.icon} source={require('../img/passlogo.png')} />
                            <View style={styles.accountDetailBorder}>
                                <TouchableHighlight onPress={() => this.setState({resetPasswordModal: true})}>
                                    <Text style={styles.accountDetailInput}>Reset Password</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>

                    <Modal
                        animationType={'slide'}
                        transparent={false}
                        visible={this.state.resetPasswordModal}
                        onRequestClose={() => { this.setState({ resetPasswordModal: false }) }}
                    >
                        <KeyboardAwareScrollView
                            resetScrollToCoords={{ x: 0, y: 0 }}
                            scrollEnabled={true}
                            extraHeight={Platform.OS === 'ios' ? 50 : 500}
                        >
                        <View style={styles.resetPasswordContainer}>
                            <View style={styles.resetPasswordHead}>
                                <Text style={styles.resetPasswordHeadText}>Reset Password</Text>
                            </View>
                            <Text style={styles.resetPassword_text}>
                                PASSWORD
                            </Text>
                            <TextInput underlineColorAndroid='transparent'
                                secureTextEntry={true}
                                style={styles.resetPassword_input}
                                onChangeText={(password) => { this.state.password = (password) }}
                            />

                            <Text style={styles.resetPassword_text}>
                                CONFIRM PASSWORD
                            </Text>
                            <TextInput underlineColorAndroid='transparent'
                                secureTextEntry={true}
                                style={styles.resetPassword_input}
                                onChangeText={(confirmPasswd) => { this.state.confirmPasswd = (confirmPasswd) }}
                            />
                            <View style={styles.resetPasswordButton}>
                                <View style={styles.resetPassword_buttonContainer}>
                                    <TouchableHighlight onPress={() => this.setState({resetPasswordModal : false})} underlayColor="transparent">
                                        <Text style={styles.resetPasswordConfirm_text}>Cancel</Text>
                                    </TouchableHighlight>
                                </View>                   
                                <View style={styles.resetPassword_buttonContainer}>
                                    <TouchableHighlight onPress={() => this.resetPassword()} underlayColor="transparent">
                                        <Text style={styles.resetPasswordConfirm_text}>OK</Text>
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </View>
                        </KeyboardAwareScrollView>
                    </Modal>

                </View>
            </KeyboardAwareScrollView>
        )
    }
}

export default AccountSetting;