const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendOTP(email, otp) {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Password reset otp',
    html: `
            <h2>Here is your otp</h2>
            <p>Your otp is</p>
            <h1>${otp}</h1>

            <p>This otp will expire in 5 mins</p>
        `,
  });
}

module.exports = sendOTP;
