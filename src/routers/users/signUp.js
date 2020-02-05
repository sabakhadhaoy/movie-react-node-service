const express = require('express');
const router = express.Router();
const admin = require('../../helpers/firebase');

router.post('/signup', (req, res) => {
  const { userName, passWord, fullName, email } = req.body;

  console.log(req.body)

  if (userName == null || passWord == null || fullName == null || email == null) {
    return res.json({
      respcode: 2,
      respmsg: 'Invalid Parameters'
    })
  }

  const database = admin.firestore();

  database.collection('users').where('username', '==', userName).get()
    .then(result => {
      if (result.empty) {
        database.collection('users').doc(userName).set({
          username: userName,
          password: passWord,
          fullname: fullName,
          email: email
        })
        return res.json({
          respcode: 0,
          respmsg: 'Registration Success'
        })
      }
      else {
        return res.json({
          respcode: 1,
          respmsg: 'Username already taken'
        })
      }
    })
    .catch(err => {
      return res.json({
        respcode: 2,
        respmsg: err.message,
      })
    })
})

module.exports = router;