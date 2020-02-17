const express = require('express');
const router = express.Router();
const admin = require('../../helpers/firebase');

router.get('/login', (req, res) => {
  const { userName, passWord } = req.query;

  const database = admin.firestore();

  if (userName === null || passWord === null) {
    return res.json({
      respcode: 1,
      respmsg: 'Invalid Parameters',
      respdata: null
    })
  }

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

  /**
   * Promise
   */

  // const userPromise = new Promise((resolve, reject) => {
  //   database.collection('users').where('username', '==', userName).where('password', '==', passWord).get()
  //     .then(result => {
  //       if (result.empty) {
  //         resolve('Invalid Credentials')
  //       } else {
  //         const data = result.docs[0].data();
  //         resolve(data)
  //       }
  //     })
  //     .catch(err => {
  //       reject(err)
  //     })
  // })

  // userPromise
  //   .then(res => {
  //     console.log(res)
  //   })
  //   .catch(err => {
  //     console.log(err)
  //   })

  //-------------------------------------------------------------------------------------------------//

  /**
   * Async Await
   */

  // const userAsync = async () => {
  //   await database.collection('users').where('username', '==', userName).where('password', '==', passWord).get()
  //     .then(result => {
  //       if (result.empty) {
  //         console.log('Invalid Credentials')
  //       } else {
  //         const data = result.docs[0].data();
  //         console.log(data)
  //       }
  //     })
  //     .catch(err => {
  //       console.log(err)
  //     })

  //   console.log('HAHAHAHA')
  // }

  // userAsync()

  //-------------------------------------------------------------------------------------------------//

})

module.exports = router;