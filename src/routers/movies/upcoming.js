const express = require('express');
const router = express.Router();
const admin = require('../../helpers/firebase');
const axios = require('axios');
const moviedbAPI = require('../../helpers/moviedbAPI');

router.get('/upcoming', (req, res) => {
  try {

    const { page } = req.query;

    const option = {
      method: 'get',
      url: `https://api.themoviedb.org/3/movie/upcoming?api_key=${moviedbAPI.api_key}&page=${page}`
    }

    axios(option).then(result => {

      // console.log(result.data.results[0])

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