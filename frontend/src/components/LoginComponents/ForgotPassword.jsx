import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  async function handleSendOTP() {
    try {
      const request = await fetch('http://localhost:3000/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const response = await request.json();

      setMessage(response.message);

      if (response.success) {
        localStorage.setItem('resetEmail', email);
        navigate('/verify-otp');
      }
    } catch (e) {
      console.log(e.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-96 bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-2">Forgot Password</h1>

        <p className="text-gray-500 text-center mb-6">
          Enter your registered email to receive an OTP.
        </p>

        <div className="mb-4">
          <label className="block mb-2 font-medium">Email Address</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {message && <p className="text-center text-blue-600 mb-4">{message}</p>}

        <button
          onClick={handleSendOTP}
          className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition"
        >
          Send OTP
        </button>

        <p className="text-center text-gray-600 mt-6">
          Remember your password?{' '}
          <Link to="/" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
