const express = require('express');
const { signupValidation, loginValidation } = require('../Middlewares/AuthValidation');
const { signup, all, login } = require('../Controllers/AuthController');
const router = express.Router();




router.post('/signup',signupValidation,signup);
router.post('/login',loginValidation,login)

router.get('/all', all);

module.exports = router;