var firebase = require('firebase')

const firebaseConfig = {
  apiKey: 'AIzaSyAt8JUaD59l-OmMthskpwLlhrUShCyOxK8',
  authDomain: 'express-firebase-auth-2caa3.firebaseapp.com',
  databaseURL:
    'https://express-firebase-auth-2caa3-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'express-firebase-auth-2caa3',
  storageBucket: 'express-firebase-auth-2caa3.appspot.com',
  messagingSenderId: '673764351687',
  appId: '1:673764351687:web:5f81cee0ee6e02495268e2',
  measurementId: 'G-SR0GW0W8QG',
}

firebase.initializeApp(firebaseConfig)

module.exports = firebase
