const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');

const {
  login,
  signup,
  dashboard,
  forgotPassword,
  verifyOtp,
  resetPassword,
} = require('../controllers/loginController');

router.post('/login', login);
router.post('/signup', signup);
router.post('/forgot-password', forgotPassword);
router.post('/verify-otp', verifyOtp);
router.put('/reset-password', resetPassword);
router.get('/dashboard', verifyToken, dashboard);

module.exports = router;
