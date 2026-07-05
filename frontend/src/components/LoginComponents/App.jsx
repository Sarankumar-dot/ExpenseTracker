import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [res, setRes] = useState('');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const navigate = useNavigate();

  function updateEmail(e) {
    setEmail(e.target.value);
  }

  function updatePassword(e) {
    setPassword(e.target.value);
  }

  async function handleLogin() {
    try {
      const request = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const response = await request.json();

      if (response.success) {
        localStorage.setItem('token', response.token);
        navigate('/dashboard');
      }

      setRes(response.message);
    } catch (e) {
      console.log(e.message);
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="w-96 bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 font-medium">
            Email
          </label>

          <input
            value={email}
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            onChange={updateEmail}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block mb-2 font-medium">
            Password
          </label>

          <input
            type="password"
            value={password}
            id="password"
            name="password"
            onChange={updatePassword}
            placeholder="Enter your password"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {error && <p className="text-red-500 p-4">{error}</p>}
        {res && <p className="text-amber-950 p-4">{res}</p>}
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition"
        >
          Login
        </button>

        <p className="text-center text-gray-600 mt-4">
          <Link to="/forgot-password" className="text-blue-500 hover:underline">
            Forgot-Password?
          </Link>
        </p>

        <p className="text-center text-gray-600 mt-4">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default App;
