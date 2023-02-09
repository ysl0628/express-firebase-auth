var express = require('express')
const firebase = require('../connection/firebase_connect')
const firebaseDB = require('../connection/firebase_admin_connect')
var router = express.Router()
const firebaseAuth = firebase.auth()

/* GET user listing. */
router.get('/', function (req, res, next) {
  const error = req.flash('error')
  res.render('signUp', { error })
})

router.post('/', (req, res, next) => {
  const email = req.body.email
  const password = req.body.password
  const nickname = req.body.nickname
  firebaseAuth
    .createUserWithEmailAndPassword(email, password)
    .then((user) => {
      const saveUser = {
        email: email,
        nickname: nickname,
        uid: user.user.uid,
      }
      firebaseDB.ref('users/' + user.user.uid).set(saveUser)
      res.redirect('/signup/success')
    })
    .catch((error) => {
      const errorMessage = error.message
      req.flash('error', errorMessage)
      res.redirect('/signup')
    })
})

router.get('/success', (req, res, next) => {
  res.render('success', {
    title: '註冊成功',
  })
})

module.exports = router
