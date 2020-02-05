const express = require('express');
const router = express.Router();
const admin = require('../../helpers/firebase');
const axios = require('axios');
const moviedbAPI = require('../../helpers/moviedbAPI');

router.get('/latest', (req, res) => {
  try {

    const option = {
      method: 'get',
      url: `https://api.themoviedb.org/3/movie/latest?api_key=${moviedbAPI.api_key}`
    }

    axios(option).then(result => {
      return res.json({
        respcode: 0,
        respmsg: 'Success',
        respdata: result.data
      })
    })

  } catch (err) {
    console.log(error.stack)
  }

})

module.exports = router;