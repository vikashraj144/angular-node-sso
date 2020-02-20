const dotenv = require('dotenv').config({
  path: './.env'
});
const port = process.env.PORT || 3001;
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const app = express();
var validationError = require('./utils/validationError');

const {
  check
} = require('express-validator/check');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(cors()); //enable cores

require('./config/knex')(app);

const userController = require('./controllers/userController');
// const tagController = require('./controllers/tagController');

app.post(`${process.env.VERSION}/login`, validationError.loginValidation, userController.login);
app.post(`${process.env.VERSION}/register`, validationError.registerValidation, userController.register);

var routes = require('./routes');
app.use(`${process.env.VERSION}/`, routes);

// creating server
var server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server is listening on port => ${port}`);
});
module.exports = server;
