import {
  StyleSheet,
  Platform
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },

  headerContainer: {
    flexDirection: 'row',
    width: null,
    height: null,
    borderBottomWidth: 1,
    borderColor: 'rgba(100,100,100,0.8)',
    padding: 10
  },

  headMenuButtonContainer: {
    width: 100,
    marginLeft: Platform.OS === 'ios'? 100:120
  },

  headMenuSelectedStyle: {
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'orange'
  },
  headMenuUnSelectedStyle: {
    borderWidth: 1,
    borderRadius: 5,
  },
  headMenuText: {
    padding: 5
  },

  footMenuSelectStyle: {
    backgroundColor: 'orange'
  },
  footMenuUnSelectedStyle: {
    backgroundColor: 'white'
  },

  settingMenu: {
    marginTop: -10,
    marginLeft: Platform.OS === 'ios'? 55:75,
    padding: 15
  },
  settingIcon: {
    width: 20,
    height: 20,
  },

  settingContainer: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  settingListContainer: {
    marginTop: Platform.OS === 'ios'? 280:320,
    backgroundColor: 'white',
    height: 300,
  },
  settingList: {
    height: 30,
    marginTop: 15,
    justifyContent: 'center',
    padding: 10
  },
  settingListIcon: {
    padding: 10,
    marginLeft: 5,
    width: 25,
    height: 25,
    marginTop: 10
  },
  settingListText: {
    padding: 15
  },


  writenoteIcon: {
    width: 20,
    height: 20,
  },

  calendar: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#eee',
    height: 350
  },

  footContainer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },

  footIcon: {
    width: 50,
    height: 50,
    margin: Platform.OS === 'ios'? 15:20,
  },

  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex:1,
    paddingTop: 30
  },

 writenoteModalContainer: {
    backgroundColor: 'white',
    marginTop: 10,
  },
  writeNoteTimeText: {
    color: 'rgba(100,100,100,0.7)',
  },
  writeNoteArea: {
     paddingLeft: 20,
     marginLeft: Platform.OS === 'ios'? 0:20,
     marginRight: Platform.OS === 'ios'? 0:20,
     paddingRight: 20,
     marginBottom: 60,
     fontSize: 20,
     textAlignVertical: 'top',
  },

  newTaskModalContainer: {
    flex: 1,
    height: null,
    width: null,
    backgroundColor: 'white',
    marginTop: Platform.OS === 'ios'? 20:0
  },
  newTaskModalHead: {
    paddingTop: Platform.OS === 'ios'? 40:20,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  newTaskModalCancelButton: {
    marginLeft: 10,
    marginTop: 5,
  },
  newTaskModalPublishButton: {
    marginRight: 10,
    marginTop: 5
  },
  newTaskText: {
    marginLeft: Platform.OS === 'ios'? 65:85,
    marginRight: Platform.OS === 'ios'? 65:85,
    fontSize: 18
  },
  newTaskTitleContainer: {
    justifyContent: 'center',
    height: 50
  },
  newTaskTitleTextInput: {
    marginLeft: 30,
    marginRight: 30,
    fontSize: 18
  },
  newTaskDesContainer: {
    paddingTop: 10,
    height: 150,
    paddingBottom: 5
  },
  newTaskDescTextInput: {
    marginLeft: 30,
    marginRight: 30,
    fontSize: 18,
    height: 130,
    textAlignVertical: 'top',
  },
  newTaskDetailBar: {
    marginLeft: 30,
    height: 30,
    justifyContent: 'center'
  },
  taskPriority: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
    marginTop: 5,
    marginBottom: 5
  },
  newTaskHeadButton: {
    padding: 10,
    marginLeft: -10,
    marginRight: -10
  },

  courseListContainer: {
    backgroundColor: 'white',
    height: 50,
    justifyContent: 'center',
    width: null,
    borderBottomWidth: 1,
    marginLeft: 15,
    marginRight: 25
  },
  courseNameCodeText: {

  },
  courseCodeText: {
    color: 'black',
    fontSize: 18,
    margin: 30,
    marginTop: 50,
    marginBottom: 50,
  },

  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  },

  friendsHead: {
    fontSize: 20,
    color: 'orange'
  },

  friendsPhotoBorder: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    paddingRight: 10,
  },
  friendsPhoto: {
    height: 80, 
    width: 80,
    borderRadius: 10
  },
  friendsNameStyleBorder: {
    margin: 3
  },
  friendsNameStyle: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  friendsNameDetailStyle: {
    fontSize: 13,
    fontWeight: 'bold',
    fontStyle: 'italic',
    padding: 1
  },
  friendsContainer: {
    marginTop: 10,
    backgroundColor: 'rgba(200,200,200,0.3)',
    padding: 5
  }


});

export default styles;
