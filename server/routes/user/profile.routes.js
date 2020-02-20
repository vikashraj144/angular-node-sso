const express = require('express');
const path = require('path');
const router = express.Router();
const {
  check
} = require('express-validator/check');
var validateError = require('../../utils/validationError');

const multer = require('multer');
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, './public/uploads/profile/');
  },
  filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });
// const upload = multer({dest: __dirname + '/uploads/images'});

const profileController = require('../../controllers/profileController');
router.get('/get-profile/:id', profileController.getProfile);
router.post('/update-profile',upload.single('profilePic'), profileController.updateProfile);
router.post('/file-upload',upload.single('file'), function(req,res){
  return res.json({
    response: req.file.filename
  });
});
router.post('/logout',validateError.emailValidation, profileController.logout);
router.post('/add-user', [
  check('password').isLength({
    min: 3
  }),
  check('email_id')
  .isLength({
    min: 5
  })
  .isEmail()
],profileController.addUser);

module.exports = router;
