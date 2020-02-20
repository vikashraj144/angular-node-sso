const express = require('express');
const router = express.Router();
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens


const userRoutes = require('./user/user.routes');

var app = express();
app.set('secrectKey', 'vikask'); // secret variable
// router.use('/user', userRoutes);

router.use('/user', userRoutes);
module.exports = router;
