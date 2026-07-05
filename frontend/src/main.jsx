import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './components/LoginComponents/App.jsx';
import Signup from './components/LoginComponents/Signup.jsx';
import Dashboard from './components/LoginComponents/Dashboard.jsx';
import ForgotPassword from './components/LoginComponents/ForgotPassword.jsx';
import ResetPassword from './components/LoginComponents/ResetPassword.jsx';
import VerifyOtp from './components/LoginComponents/VerifyOtp.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />,
  },
  {
    path: '/reset-password',
    element: <ResetPassword />,
  },
  {
    path: '/verify-otp',
    element: <VerifyOtp />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
