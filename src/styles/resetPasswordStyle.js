import {
  StyleSheet,
  Platform
} from 'react-native';

const ResetPasswordStyles = StyleSheet.create({
  body: {

  },

  backgroundImg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: null,
    height: null,

  },

  logo: {
    width: 100,
    height: 100,
    marginTop: -20
  },

  infoHead: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    fontSize: 18,
    marginTop: 10
  },

  info: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    width: 250,
    marginTop: 10
  },

  inputStyle: {
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderWidth: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    width: Platform.OS === 'ios' ? 230 : 250,
    paddingVertical: 10,
    marginTop: 30,
    borderRadius: 10,
    height: 40,
    paddingLeft: 20,
  },

  sendReset: {
    backgroundColor: '#8C88FF',
    borderColor: '#8C88FF',
    borderWidth: 20,
    borderRadius: Platform.OS === 'ios' ? 10 : 3,
    width: Platform.OS === 'ios' ? 250 : 270,
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? 10 : 10,
  },

  textButtonStyle: {
    color: '#ffffff'
  },

});

export default ResetPasswordStyles;
