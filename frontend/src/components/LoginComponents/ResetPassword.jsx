import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  async function handleResetPassword() {
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      const email = localStorage.getItem('resetEmail');

      const request = await fetch('http://localhost:3000/reset-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const response = await request.json();

      setMessage(response.message);

      if (response.success) {
        localStorage.removeItem('resetEmail');

        setTimeout(() => {
          navigate('/');
        }, 1500);
      }
    } catch (e) {
      console.log(e.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-96 bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-2">Reset Password</h1>

        <p className="text-gray-500 text-center mb-6">Create a new password for your account.</p>

        <div className="mb-4">
          <label className="block mb-2 font-medium">New Password</label>

          <input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium">Confirm Password</label>

          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {message && <p className="text-center text-blue-600 mb-4">{message}</p>}

        <button
          onClick={handleResetPassword}
          className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition"
        >
          Reset Password
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
