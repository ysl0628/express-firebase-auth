var express = require('express')
const firebaseDb = require('../connection/firebase_admin_connect')
const firebase = require('../connection/firebase_connect')
var router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  firebaseDb.ref('list').once('value', (snapshot) => {
    // 取得登入權限
    const auth = req.session.uid
    const error = req.flash('error')
    res.render('index', {
      title: '留言板',
      auth: auth,
      list: snapshot.val(),
      error: error,
    })
  })
})

module.exports = router
