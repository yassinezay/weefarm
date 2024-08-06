import React, { useState } from 'react';
import axios from 'axios';
import Checkbox from 'components/checkbox';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false); // State for checkbox
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    console.log('Submitting form with:', { email, password }); // Debug log

    if (!email.trim() || !password.trim()) {
      setError('Email and password are required');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/superadmins/login', { email, password });
      console.log('Response:', response); // Log the response

      if (response.data.token) {
        // Determine expiration time based on checkbox
        const expiration = keepLoggedIn ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000; // 30 days or 1 day in milliseconds
        const expiryDate = new Date(new Date().getTime() + expiration);

        // Store token with expiry date
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('tokenExpiry', expiryDate.toISOString());

        navigate('/admin/default'); // Redirect to /admin/default
      }
    } catch (err) {
      console.error('Error:', err); // Log the error

      if (err.response) {
        const { status, data } = err.response;
        console.log('Error status:', status);
        console.log('Error data:', data);

        if (status === 404) {
          setError('Invalid email or password');
        } else if (status === 500) {
          setError('Internal server error. Please try again later.');
        } else if (data && data.message) {
          setError(data.message);
        } else {
          setError('Something went wrong. Please try again later.');
        }
      } else {
        setError('Network error. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    navigate('/auth/forgot-password'); // Redirect to the correct path
  };

  return (
    <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
          Sign In
        </h4>
        <p className="mb-9 ml-1 text-base text-gray-600">
          Enter your email and password to sign in!
        </p>
        <div className="mb-6 flex items-center gap-3">
          <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
        </div>
        <form onSubmit={handleSignIn}>
          {/* Email */}
          <div className="mb-3">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-white">Email*</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="mail@simmmple.com"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-white">Password*</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min. 8 characters"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Checkbox */}
          <div className="mb-4 flex items-center justify-between px-2">
            <div className="flex items-center">
              <Checkbox checked={keepLoggedIn} onChange={() => setKeepLoggedIn(!keepLoggedIn)} />
              <p className="ml-2 text-sm font-medium text-navy-700 dark:text-white">
                Keep me logged In
              </p>
            </div>
            <button
              type="button"
              className="text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
              onClick={handleForgotPassword}
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
      </div>
    </div>
  );
}
