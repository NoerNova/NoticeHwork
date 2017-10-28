import {
    StyleSheet,
    Platform
} from 'react-native';

const styles = StyleSheet.create({

    saveButton: {
        marginLeft:  Platform.OS === 'ios'? 180:225,
        marginRight: 5,
        marginTop:  10,
        backgroundColor: '#2196F3',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        height: 30,
        padding: 5
    },

    cancelButton: {
        marginLeft:  18,
        marginRight: 5,
        marginTop:  10,
        backgroundColor: '#2196F3',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        height: 30,
        padding: 5
    },
 
    saveText: {
        color: 'white',
        backgroundColor: 'transparent',
        fontSize: 16,
    },


    icon: {
        width: 25,
        height: 25,
        marginLeft: 40,
        marginTop: 15
    },


    accountTitle: {
        width: null,
        height: 180,
    },

    accountContainer: {
        flex: 1,
        width: null,
        height: null,
        marginTop: 20
    },

    accountPhoto: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 30,
        width: 100,
        height: 100,
        backgroundColor: 'rgba(200,200,200,0.3)',
        borderRadius: 10,
        marginTop: -10
    },

    accountPhotoText: {
        width: 100,
        height: 100,
        borderRadius: 10
    },

    accountNameInput: {
        width: Platform.OS === 'ios' ? 150 : 180,
        height: 30,
        marginTop: 10,
        fontSize: 20,
        color: 'white',
        textShadowColor: 'black',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 5
    },

    accountDetailInput: {
        marginTop: 10,
        width: Platform.OS === 'ios' ? 150 : 220,
        height: 30,
        fontSize: 16
    },

    accountDetailBorder: {
        marginLeft: 40,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.2)',
        width: Platform.OS === 'ios' ? 200 : 220
    },

    accountNameInputBorder: {
        marginLeft: 20,
        borderBottomWidth: 1,
        borderColor: 'rgba(0,0,0,0.5)',
    },


    resetPassword_text: {
        backgroundColor: 'transparent',
        marginTop: 10,
        fontSize: 12,
        alignSelf: 'flex-start',
        marginLeft: 55
    },
    resetPassword_input: {
        borderColor: 'rgba(0, 0, 0, 0.3)',
        borderWidth: 1,
        marginLeft: 50,
        marginRight: 50,
        marginTop: 5,
        borderRadius: 10,
        height: 40,
        width: Platform.OS === 'ios' ? 225 : 250,
        paddingLeft: 20,
        paddingRight: 20
    },
    resetPassword_buttonContainer: {
        backgroundColor: '#8C88FF',
        borderColor: '#8C88FF',
        borderWidth: 10,
        borderRadius: 5,
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
        marginRight: 10
    },
    resetPasswordConfirm_text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    resetPasswordContainer: {
        marginTop: 150,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        height: null,
        width: null
    },
    resetPasswordButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    resetPasswordHead: {
        marginBottom: 20
    },
    resetPasswordHeadText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
})

export default styles;