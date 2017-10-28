import {
  StyleSheet,
  Platform
} from 'react-native';

const styles = StyleSheet.create({
  fContainer: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    height: null,
    width: null,
    flex: 1
  },

  sContainer: {
      backgroundColor: 'white',
      marginTop: 20
  },

  titleContainer: {
    alignItems: 'center',
    margin: 20,
    marginTop: -30
  },

  titleText: {
    fontSize: 20,
    fontWeight: 'bold'
  },

  buttonContainer: {
    height: 50,
    padding: 7,
    flexDirection: 'row',
    alignItems: 'center'
  },

  dayButton: {
    borderWidth: 1,
    borderColor: 'rgba(10,10,10,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    borderRadius: 3,
    backgroundColor: 'rgba(200,200,200,0.3)'

  },

  daySelectButton: {
    borderWidth: 1,
    borderColor: 'rgba(10,10,10,0.5)',
    borderRadius: 3,
    backgroundColor: 'rgba(10,10,200,0.3)',
    width: Platform.OS === 'ios'? 45:50,
    height: Platform.OS === 'ios'? 45:50,
    justifyContent: 'center',
    alignItems: 'center',
  },

  dayButtonText: {
    padding: Platform.OS === 'ios'? 3:5
  },

  timePickerArea: {
    flexDirection: 'row',
  },

  toText: {
    marginTop: Platform.OS === 'ios'? 100:90
  },

  pickerView: {
    flex: 1,
    flexDirection: 'column',
    height: 200,
  },

  addButton: {
    margin: 10,
    width: 80,
    height: 40,
    alignItems: 'center',
    borderWidth: 1,
    backgroundColor: 'rgba(10,10,200,0.3)',
    borderRadius: 10,
  },

  exitContainer: {
    alignItems: 'flex-end',
    margin: 10
  },

  exitIcon: {
    width: 30,
    height: 30,
  },

  dayTimeListContainer: {
    marginLeft: 15,
    marginRight: 15,
    borderBottomWidth: 2,
    borderTopWidth: 2
  },
  dayTimeListView: {
    borderBottomWidth: 1,
    width: null,
    height: 50,
    padding: 15
  }

});

export default styles;
