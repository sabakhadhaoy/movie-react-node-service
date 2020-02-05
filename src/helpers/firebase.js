var admin = require('firebase-admin');
var serviceAccount = require('../config/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://moviedb-4675a.firebaseio.com"
});

module.exports = admin;