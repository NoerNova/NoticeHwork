import {
  StyleSheet,
  Platform
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor: 'rgba(0,0,0,0.8)',
  },

  settingContainer: {
    marginTop: 130,
    backgroundColor: 'white',
    borderRadius: 10
  },

  hr: {
    borderBottomWidth: 2,
    marginTop: Platform.OS === 'ios'? 150:200,
    width: Platform.OS === 'ios'? 230:260,
    marginLeft: Platform.OS === 'ios'? 46:50,
    borderColor: 'rgba(0,0,0,0.2)'
  },

  logo: {
    width: 100,
    height: 100,
    marginLeft: Platform.OS === 'ios' ? 110 : 130,
    marginTop: 60,
    position: 'relative',
    borderColor: '#0beaaf',
    borderRadius: 50,
    borderWidth: 1
  },

  setDetail: {
    marginLeft: 40,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.2)',
    width: Platform.OS === 'ios'? 250:280
  },

  setDetailText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'rgba(0,0,0,0.2)',
    padding: 15,
    marginLeft: -15
  },

  completeSetDetail: {
    position: 'absolute',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'rgba(0,0,0,0.2)',
    right: 1,
    marginTop: 15
  },

  modalTitle: {
    alignItems: 'center',
    margin: 20,
    marginTop: -20
  },

  modalTitleText: {
    fontSize: 20,
    fontWeight: 'bold'
  },

  confirmButton: {
    alignItems: 'flex-end',
    backgroundColor: null
  },
  confirmButtonText: {
    fontSize: 18,
    color: 'white',
    backgroundColor: '#2196F3',
    padding: 20
  },

  exitContainer: {
    alignItems: 'flex-end',
    margin: 10
  },
  exitIcon: {
    width: 30,
    height: 30,
  }

});

export default styles;
