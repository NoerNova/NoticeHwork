import * as firebase from 'firebase';
const firebaseConfig = {
  apiKey: "AIzaSyC5Cd2pSsgvAlFPrFtKa2uRVR2-KbUcn28",
  authDomain: "noticehwork.firebaseapp.com",
  databaseURL: "https://noticehwork.firebaseio.com",
  projectId: "noticehwork",
  storageBucket: "noticehwork.appspot.com",
  messagingSenderId: "383365177474",
}
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}