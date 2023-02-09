var admin = require('firebase-admin')

var serviceAccount = require('../express-firebase-auth-2caa3-firebase-adminsdk-tzq92-301f637d10.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DATABASE_URL,
})

const db = admin.database()

module.exports = db
