var express = require('express')
const firebaseDb = require('../connection/firebase_admin_connect')
var router = express.Router()

/* GET user listing. */
router.get('/', function (req, res) {
  firebaseDb.ref('users/' + req.session.uid).once('value', (snapshot) => {
    res.render('user', {
      title: '會員專區',
      nickname: snapshot.val()?.nickname || '',
    })
  })
})

module.exports = router
