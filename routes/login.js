var express = require('express')
const firebase = require('../connection/firebase_connect')
const firebaseDB = require('../connection/firebase_admin_connect')
var router = express.Router()
const firebaseAuth = firebase.auth()

/* GET user listing. */
router.get('/', function (req, res, next) {
  const error = req.flash('error')
  res.render('login', { error })
})

router.post('/', (req, res) => {
  const email = req.body.email
  const password = req.body.password

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((user) => {
      // 建立登入權限
      req.session.uid = user.user.uid
      res.redirect('/')
    })
    .catch((error) => {
      console.log('登入失敗')
      const errorMessage = error.message
      req.flash('error', errorMessage)
      res.redirect('login')
    })
})

module.exports = router
