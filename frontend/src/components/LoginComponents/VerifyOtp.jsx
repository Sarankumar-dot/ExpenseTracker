import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const VerifyOtp = () => {
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  async function handleVerifyOTP() {
    try {
      const email = localStorage.getItem('resetEmail');

      const request = await fetch('http://localhost:3000/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          otp,
        }),
      });

      const response = await request.json();

      setMessage(response.message);

      if (response.success) {
        navigate('/reset-password');
      }
    } catch (e) {
      console.log(e.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-96 bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-2">Verify OTP</h1>

        <p className="text-gray-500 text-center mb-6">Enter the 6-digit OTP sent to your email.</p>

        <div className="mb-4">
          <label className="block mb-2 font-medium">OTP</label>

          <input
            type="text"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            className="w-full border border-gray-300 rounded-lg p-3 text-center tracking-[0.4em] text-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {message && <p className="text-center text-blue-600 mb-4">{message}</p>}

        <button
          onClick={handleVerifyOTP}
          className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition"
        >
          Verify OTP
        </button>
      </div>
    </div>
  );
};

export default VerifyOtp;
