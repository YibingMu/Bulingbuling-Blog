const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require('./config/database');
const path = require('path');
const bodyParser = require('body-parser');
const auth = require('./routes/auth');
const cors = require('cors');

mongoose.Promise = global.Promise;
mongoose.connect(config.uri, (err) => {
  if (err) {
    console.log('Cannot connect to Database' + err);
  } else {
    console.log('Connect to Database: ' + config.db);
  }
});


app.use(cors({
    origin: 'http://localhost:4200'
}));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/client/dist/'));

app.use('/auth', auth);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/dist/index.html'));
});

app.listen(8080, () => {
  console.log('Listening to 8080');
});
