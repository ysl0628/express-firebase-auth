const path = require('path')
const logger = require('morgan')
const express = require('express')
const flash = require('connect-flash')
const createError = require('http-errors')
const session = require('express-session')
const cookieParser = require('cookie-parser')
// const { Firestore } = require('@google-cloud/firestore')
// const { FirestoreStore } = require('@google-cloud/connect-firestore')

const indexRouter = require('./routes/index')
const userRouter = require('./routes/user')
const loginRouter = require('./routes/login')
const messageBoardRouter = require('./routes/messageBoard')
const signUpRouter = require('./routes/signup')

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(flash())
app.use(logger('dev'))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(
  session({
    secret: 'wakanda',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  })
)

// routes
app.use('/', indexRouter)
app.use('/login', loginRouter)
app.use('/signup', signUpRouter)
app.use('/messageBoard', messageBoardRouter)

// check login
app.use((req, res, next) => {
  if (req.session.uid) {
    // 要加 return
    return next()
  }
  res.redirect('/')
})
app.use('/user', userRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
