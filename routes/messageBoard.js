var express = require('express')
const firebaseDB = require('../connection/firebase_admin_connect')
const { body, validationResult } = require('express-validator')

var router = express.Router()

/* GET user listing. */
router.post(
  '/',
  body('content', '內容不可為空').notEmpty(),
  function (req, res, next) {
    const result = validationResult(req)
    const error = result.array()
    if (!result.isEmpty()) {
      req.flash('error', error[0].msg)
      res.redirect('/')
    } else {
      firebaseDB.ref('users/' + req.session.uid).once('value', (snapshot) => {
        const nickname = snapshot.val()?.nickname
        const ref = firebaseDB.ref('list').push()
        const listContent = {
          nickname: nickname,
          content: req.body.content,
        }
        ref.set(listContent).then(() => {
          res.redirect('/')
        })
      })
    }
  }
)

module.exports = router
