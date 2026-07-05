const db = require('../config/config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendOTP = require('../utils/mail');

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const query = `select * from users where email = ?`;
    const [rows] = await db.query(query, [email]);

    if (rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    const user = rows[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '1d',
        }
      );
      return res.status(200).json({
        success: true,
        token,
        message: 'login success',
      });
    } else {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const checkIfEmailExist = `select * from users where email = ?`;
    const [rows] = await db.query(checkIfEmailExist, [email]);

    if (rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'email already exists',
      });
    }

    const query = `insert into users(name,email,password) values(?,?,?)`;
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.query(query, [name, email, hashedPassword]);

    if (result.affectedRows > 0) {
      return res.status(201).json({
        success: true,
        message: 'user registered',
      });
    } else {
      return res.status(400).json({
        success: false,
        message: 'Registration failed',
      });
    }
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

const dashboard = async (req, res) => {
  return res.status(200).json({
    success: true,
    user: req.user,
  });
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      success: false,
      message: 'Email is required',
    });
  }

  try {
    const checkIfEmailExist = `select * from users where email = ?`;

    const [rows] = await db.query(checkIfEmailExist, [email]);

    if (rows.length == 0) {
      return res.status(404).json({
        success: false,
        message: 'email not exists',
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

    const storeOTP = `update users set otp = ? , otp_expiry=? where email = ?`;
    const [result] = await db.query(storeOTP, [otp, otpExpiry, email]);

    if (result.affectedRows === 0) {
      return res.status(400).json({
        success: false,
        message: 'Failed to store OTP',
      });
    }

    await sendOTP(email, otp);

    return res.status(200).json({
      success: true,
      message: 'otp sent successfully',
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({
      success: false,
      message: 'Email and OTP are required',
    });
  }

  try {
    const query = 'SELECT otp, otp_expiry FROM users WHERE email = ?';

    const [rows] = await db.query(query, [email]);

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Email not found',
      });
    }

    const user = rows[0];
    const currentTime = new Date();

    // Check OTP
    if (user.otp != otp) {
      return res.status(401).json({
        success: false,
        message: 'Invalid OTP',
      });
    }

    // Check OTP Expiry
    if (user.otp_expiry < currentTime) {
      return res.status(401).json({
        success: false,
        message: 'OTP has expired',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'OTP verified successfully',
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

const resetPassword = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email and password are required',
    });
  }

  try {
    const checkIfEmailPasswordExist = `select * from users where email = ?`;

    const [rows] = await db.query(checkIfEmailPasswordExist, [email]);

    if (rows.length == 0) {
      return res.status(404).json({
        success: false,
        message: 'email not exists',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const updatePassword = `update users set password = ? ,otp = null,otp_expiry = null where email = ?`;

    const [result] = await db.query(updatePassword, [hashedPassword, email]);

    if (result.affectedRows > 0) {
      return res.status(200).json({
        success: true,
        message: 'password changed',
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Password couldn't be updated",
      });
    }
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

module.exports = { login, signup, dashboard, forgotPassword, verifyOtp, resetPassword };
