import {
  StyleSheet,
  Platform
} from 'react-native';

const styles = StyleSheet.create({

  courseContainer: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor: 'rgba(0,0,0,0.8)',
  },

  courseSettingContainer: {
    marginTop: 130,
    backgroundColor: 'white',
    borderRadius: 10
  },

  courseModalTitleText: {
    fontSize: 20,
    fontWeight: 'bold'
  },

  courseModalTitle: {
    alignItems: 'center',
    margin: 20,
    marginTop: -30
  },

  courseConfirmButton: {
    alignItems: 'flex-end',
    backgroundColor: null
  },
  courseConfirmButtonText: {
    fontSize: 18,
    color: 'white',
    backgroundColor: '#2196F3',
    padding: 20
  },

  addNewButton: {
    marginTop: 20,
    backgroundColor: '#0beaaf',
    width: 280,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5
  },

  addNewText: {
    color: 'white',
    fontSize: 20,
  },

  hr: {
    borderBottomWidth: 2,
    marginTop: Platform.OS === 'ios'? 50:100,
    width: Platform.OS === 'ios'? 230:260,
    marginLeft: Platform.OS === 'ios'? 46:50,
    borderColor: 'rgba(0,0,0,0.2)'
  },

  logo: {
    width: 100,
    height: 100,
    marginLeft: Platform.OS === 'ios' ? 110 : 130,
    marginTop: 30,
    position: 'relative',
    borderColor: '#0beaaf',
    borderRadius: 50,
    borderWidth: 1
  },

  newCourseContainer: {
    flex: 1,
    width: null,
    height: null,
  },

  courseTitle: {
    width: null,
    height: 180,
  },

  courseName: {
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 80,
    marginLeft: 20,
    textShadowColor: 'black',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 5,
    marginRight: 80
  },

  courseCode: {
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 20,
    textShadowColor: 'black',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 5,
    marginRight: 80
  },

  saveButton: {
    marginLeft: Platform.OS === 'ios'? 250:290,
    marginRight: 5,
    marginTop: Platform.OS === 'ios'? -5:-10,
    backgroundColor: '#2196F3',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    height: 30
  },

  saveText: {
    color: 'white',
    backgroundColor: 'transparent',
    fontSize: 16,
  },

  setDetail: {
    marginLeft: 30,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.2)',
    width: Platform.OS === 'ios'? 200:240
  },

  icon: {
    width: 25,
    height: 25,
    marginLeft: 40,
    marginTop: 15
  },

  setDetailText: {
    fontSize: 18,
    color: 'rgba(199, 219, 234, 0.8)',
    padding: 15,
    marginLeft: -15,
  },

  setDetailForward: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'rgba(0,0,0,0.2)',
    padding: 15,
    marginLeft: Platform.OS === 'ios'? 215:245,
    position: 'absolute',
  },

  setCourseNameContainer: {
    flex: 1,
    width: null,
    height: null,
  },

  courseNameInput: {
    marginLeft: 40,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.8)',
    width: Platform.OS === 'ios'? 250:280
  },

  courseNameInputText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'rgba(0,0,0,0.8)',
    padding: 15,
    marginLeft: -15
  },

  completeSetDetail: {
    fontSize: 16,
    color: 'rgba(0,0,0,0.2)',
    padding: 15,
    marginTop: 2,
    marginRight: Platform.OS === 'ios'? 80 : 60,
    marginLeft: Platform.OS === 'ios'? 0 : 40
  },

  instructorTitle: {
    width: null,
    height: 180,
  },

  instructorContainer: {
    flex: 1,
    width: null,
    height: null,
  },

  instructorPhoto: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    width: 100,
    height: 100,
    backgroundColor: 'rgba(200,200,200,0.3)',
    borderRadius: 10,
  },

  instructorPhotoText: {
    width: 100,
    height: 100,
    borderRadius: 10
  },

  instructorNameInput: {
    width: Platform.OS === 'ios'? 150:180,
    height: 30,
    marginTop: 10,
    fontSize: 20,
    color: 'white',
    textShadowColor: 'black',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 5
  },

  instructorDetailInput: {
    marginTop: 10,
    width: Platform.OS === 'ios'? 150:180,
    height: 30,
    marginTop: 10,
    fontSize: 16
  },

  instructorDetailBorder: {
    marginLeft: 40,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.2)',
    width: Platform.OS === 'ios'? 200:220
  },

  instructorNameInputBorder: {
    marginLeft: 20,
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.5)',
  },

  setInstructorDetail: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'rgba(0,0,0,0.2)',
    padding: 15,
    paddingTop: 20,
    marginLeft: Platform.OS === 'ios'? 90: 120,
    width: 100
  },

  exitContainer: {
    alignItems: 'flex-end',
    margin: 10,
  },

  exitIcon: {
    width: 30,
    height: 30,
  },

  courseListContainer : {
    marginTop: 20,
    backgroundColor: 'transparent',
    width: 280,
    height: 80,
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 5,
  },
  courseNameCodeText : {

  },
  courseCodeText : {
    color: 'white',
    fontSize: 18,
    marginLeft: 50,
    marginRight: 30
  },
  courseNameText : {
    color: 'white',
    fontSize: 22,
    marginLeft: 50,
    marginRight: 30
  },

  searchContainer: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(222, 222, 222, 0.3)',
    marginLeft: 35,
    marginRight: 40,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginLeft: 30
  },
  searchInput: {
    width: 100,
    paddingLeft: 10,
  },
  searchButton: {
    marginLeft: Platform.OS === 'ios'? 40:75,
    borderWidth: 1,
    padding: 5,

  },

  viewCourseContainer: {
    flex: 1
  },

  courseViewTitle: {
    width: null,
    height: 135,
  },
  courseNameView: {
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 40,
    marginLeft: 20,
    textShadowColor: 'black',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 5,
    marginRight: 70
  },
  courseCodeView: {
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 20,
    textShadowColor: 'black',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 5,
    marginRight: 80
  },
  courseViewDetail: {
    marginLeft: 30
  },
  editLeaveButton: {
    backgroundColor: '#2196F3',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },

  headerContainer: {
    flexDirection: 'row',
    width: null,
    height: null,
    padding: 10,
    marginTop: 20
  },
  doneButton: {
    marginLeft: Platform.OS === 'ios' ? 55 : 75,
    padding: 15
  },
  headMenuButtonContainer: {
    width: 100,
    marginLeft: Platform.OS === 'ios' ? 110 : 120
  },
  headTitle: {
    fontSize: 20,
    color: "rgba(222, 222, 222, 0.3)",
    textShadowColor: 'black',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },

});

export default styles;
