const express = require('express');
const router = express.Router();
const admin = require('../../helpers/firebase');

router.get('/login', (req, res) => {
  const { userName, passWord } = req.query;

  const database = admin.firestore();

  database.collection('users').where('username', '==', userName).where('password', '==', passWord).get()
    .then(result => {
      if (result.empty) {
        return res.json({
          respcode: 1,
          respmsg: 'Invalid Credentials',
          respdata: null
        })
      } else {
        const data = result.docs[0].data();
        return res.json({
          respcode: 0,
          respmsg: 'Success',
          respdata: data
        })
      }
    })
    .catch(err => {
      return res.json({
        respcode: 2,
        respmsg: err.message,
        respdata: null
      })
    })
})

module.exports = router;