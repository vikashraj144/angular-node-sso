var knex = require('../config/knex');
var md5 = require('md5');
var message = require('../utils/message');
var httpStatus = require('../utils/httpStatus');
var jwt = require('jsonwebtoken');

const {
  validationResult
} = require('express-validator/check');

module.exports.getUsers = async (req, res) => {
  try {
    var sql = "select U.id,U.email_id,U.first_name,U.last_name,U.phone_number,U.isActive,U.created,E.roleName from user AS U ORDER BY U.id";
    var data = await knex.raw(sql);
    return res.json(JSON.parse(JSON.stringify(data[0])));
  } catch (error) {
    console.log(error);
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({
        response: error
      });
  }
};


module.exports.login = async (req, res) => {
  try {
      await doLoginUsingEmailPassword(req, res);
  } catch (error) {
    console.log(error);
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({
        response: error
      });
  }
};

module.exports.register = async (req, res) => {
  try {
    // validateError.validateError(req,res);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array()
      });
    }
    let isUserExist = await checkUserExist(req.body.emailId);
    if (isUserExist) {
      return res
        .status(httpStatus.OK)
        .json({
          message: message.error.USER_ALLREADY_EXIST
        });
    } else {
      var data = await knex('user').insert({
        email_id: req.body.emailId,
        password: md5(req.body.password),
        isActive: 1
      });
      if (data.length > 0) {
        return res.json({
          message: message.success.REGISTER
        });
      } else {
        return res.json({
          response: message.error.UNABLE_REGISTER
        });
      }
    }
  } catch (error) {
    console.log(error);
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({
        response: error
      });
  }
};

var checkUserExist = async (email_id) => {
  try {
    var data = await knex('user').where({
      email_id: email_id,
      isActive: 1
    });
    if (data.length > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports.forgotPassword = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array()
      });
    }
    var userDetails = await knex('user').where({
      email_id: req.body.emailId,
      isActive: 1
    });
    if (userDetails.length > 0) {
      const data = {
        emailId: req.body.emailId
      };
      // mail.sendMail(data);
      return res.json({
        response: message.success.FORGOT_PASSWORD_SENT
      });
    } else {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({
          response: message.error.USER_NOT_EXIST
        });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({
        response: error
      });
  }
};

var getCurrentDate = () => {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }
  return `${yyyy}-${mm}-${dd}`;
};


var doLoginUsingEmailPassword = async (req, res) => {
  try {
    var data = await knex('user')
      .select('id', 'email_id', 'first_name', 'last_name', 'phone_number', 'created', 'updated', 'isActive')
      .where({
        email_id: req.body.gpid,
        password: md5(req.body.password),
        isActive: 1
      });
    if (data.length > 0) {
      var payload = {
        userID: data[0].id,
        email_id: data[0].email_id,
        first_name: data[0].first_name,
        last_name: data[0].last_name,
      };
      var token = jwt.sign(payload, 'ssovalidation', {
        algorithm: 'HS256',
        expiresIn: 86400 // expires in 24 hours
      });
      var updateUser = await knex('user').update({
        token: token ? token : ''
      }).where({
        id: data[0].id
      });

      let responseDataFinal = JSON.parse(JSON.stringify(data[0]));
      let responseData = {
        id: responseDataFinal.id,
        emailId: responseDataFinal.email_id,
        firstName: responseDataFinal.first_name,
        lastName: responseDataFinal.last_name,
        token: token
      }

      return res.json(responseData);
    } else {
      res
        .status(httpStatus.UNAUTHORIZED)
        .json({
          success: false,
          message: 'Authentication failed. User id or password is not correct.'
        });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({
        response: error
      });
  }
};
var getUserDetails = async (id) => {
  if (id) {
    var userDetails = await knex('user')
      .select('id', 'email_id', 'first_name', 'last_name', 'phone_number', 'created', 'updated', 'isActive')
      .where({
        id: id
      });
    return userDetails;
  } else {
    return false;
  }
};
