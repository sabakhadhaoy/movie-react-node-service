const express = require('express');
const bodyParser = require('body-parser');
const { join } = require('path');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static(join(__dirname, 'build')));

const login = require('./src/routers/users/login');
const signUp = require('./src/routers/users/signUp');
const latest = require('./src/routers/movies/latest');
const nowPlaying = require('./src/routers/movies/nowPlaying');
const popular = require('./src/routers/movies/popular');
const topRated = require('./src/routers/movies/topRated');
const upcoming = require('./src/routers/movies/upcoming');


app.use('/user', login);
app.use('/user', signUp);
app.use('/movie', latest);
app.use('/movie', nowPlaying);
app.use('/movie', popular);
app.use('/movie', topRated);
app.use('/movie', upcoming);


const port = process.env.PORT || 1234;

app.listen(port, (err) => {
  if (err) {
    console.log(`Application ${err.stack}`)
  } else {
    console.log(`Listening to port: ${port}`)
  }
})