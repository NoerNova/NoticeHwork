import {
  StyleSheet,
  Platform
} from 'react-native';

const styles = StyleSheet.create({
  body: {

  },
  topViewStyle: {
    backgroundColor: '#F8F8F8',
    height: 220,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    position: 'relative',
  },
  signUp_header: {
    backgroundColor: '#F8F8F8',
    height: 70,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    position: 'relative',
  },
  topBackground: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover'
  },
  bottBackground: {
    width: null,
    height: null,
    resizeMode: 'cover'
  },
  logoStyle: {
    width: 100,
    height: 100,
    marginLeft: Platform.OS === 'ios' ? 110 : 130,
    marginTop: 60,
    position: 'relative'
  },
  signUp_logo: {
    width: 50,
    height: 50,
    marginLeft: Platform.OS === 'ios' ? 52 : 70,
    marginTop: 10,
    position: 'relative'
  },
  textStyle: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    borderColor: 'black'
  },
  signin_button: {
    backgroundColor: 'transparent',
    borderBottomWidth: 3,
    borderColor: '#8F88FC',
    paddingLeft: Platform.OS === 'ios' ? 50 : 60,
    paddingRight: Platform.OS === 'ios' ? 50 : 60,
    paddingTop: Platform.OS === 'ios' ? 10 : 15,
    padding: 8
  },
  signup_button: {
    backgroundColor: 'transparent',
    paddingLeft: Platform.OS === 'ios' ? 50 : 60,
    paddingRight: Platform.OS === 'ios' ? 50 : 60,
    paddingTop: Platform.OS === 'ios' ? 10 : 15,
    padding: 8
  },
  buttonStyle: {
    marginTop: Platform.OS === 'ios' ? 18 : 10,
  },
  userlogin_logo: {
    width: 35,
    height: 35,
    marginTop: 40,
    position: 'relative',
  },
  userlogin_view:  {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(222, 222, 222, 0.3)',
    marginLeft: 35,
    marginRight: 40,
    paddingVertical: 10,
    flexDirection: 'row',
    marginTop: -15
  },
  inputStyle_uname: {
    width: 300,
    paddingLeft: 10,
    paddingTop: 40,
  },
  inputStyle_passwd: {
    width: 300,
    paddingLeft: 10,
    paddingTop: 20,
  },
  passwdlogin_logo: {
    width: 35,
    height: 35,
    marginTop: 20,
    position: 'relative',
  },
  passwdlogin_view: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(222, 222, 222, 0.3)',
    marginLeft: 35,
    marginRight: 40,
    paddingVertical: 10,
    flexDirection: 'row',
    marginTop: -10
  },
  continuous_button: {
    backgroundColor: '#8C88FF',
    borderColor: '#8C88FF',
    borderWidth: 20,
    borderRadius: Platform.OS === 'ios' ? 10 : 4,
    width: Platform.OS === 'ios' ? 280 : 300,
    marginLeft: Platform.OS === 'ios' ? 20 : 30,
    marginTop: Platform.OS === 'ios' ? 30 : 60,
  },
  continue_text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    alignItems: 'center',
    paddingLeft: Platform.OS === 'ios' ? 90 : 100
  },
  forgotpass_button: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? 10 : 20
  },
  forgotpass_text: {
    color: '#ffffff',
  },
  auth_login: {
    flexDirection: 'row',
    marginLeft: Platform.OS === 'ios' ? 120 : 130,
    marginTop: Platform.OS === 'ios' ? 40 : 60
  },
  auth_logo:{
    width: 30,
    height: 30,
    marginLeft: Platform.OS === 'ios' ? 9 : 13,
    marginRight: Platform.OS === 'ios' ? 10 : 13

  },

  signUp_input:{
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderWidth: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginLeft: 50,
    marginRight: 50,
    marginTop: 5,
    borderRadius: 10,
    height: 40,
    width: Platform.OS === 'ios' ? 225 : 250,
    paddingLeft: 20,
    paddingRight: 20
  },
  signup_text:{
    backgroundColor: 'transparent',
    color: 'white',
    marginTop: 10,
    fontSize: 12,
    alignSelf: 'flex-start',
    marginLeft: 55
  },
  signupConfirm_button:{
    backgroundColor: '#8C88FF',
    borderColor: '#8C88FF',
    borderWidth: 20,
    borderRadius: Platform.OS === 'ios' ? 10 : 5,
    width: Platform.OS === 'ios' ? 230 : 260,
    marginTop: Platform.OS === 'ios' ? 30 : 30,
    justifyContent: 'center',
  },
  signupConfirm_text:{
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    paddingLeft: Platform.OS === 'ios' ? 60 : 90
  },
  signinput_container:{
    marginTop: 10,
    height: 750,
    alignItems: 'center',
  },
  login_container:{
    height: Platform.OS === 'ios' ? 560 : 550
  },

  loginLoading: {
    position: 'absolute',
    marginTop: Platform.OS === 'ios'? 230 : 270,
    marginLeft: Platform.OS === 'ios'? 150 : 160
  },

  signupLoading: {
    position: 'absolute',
    marginTop: Platform.OS === 'ios'? 180 : 210,
    marginLeft: Platform.OS === 'ios'? 150 : 160
  }



});

export default styles;
