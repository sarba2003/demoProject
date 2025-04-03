// File: /pages/login.js
'use client'
import React, { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import './globals.css';

export default function LoginOTP() {
  // States for login and OTP
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  
  // UI states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showOTP, setShowOTP] = useState(false);
  
  // Mock user credentials
  const MOCK_USER = {
    username: 'rani',
    password: 'rani123'
  };

  // Refs for OTP inputs focus
  const otpInputRefs = useRef([]);

  useEffect(() => {
    // Focus first OTP input when showing OTP form
    if (showOTP && otpInputRefs.current[0]) {
      otpInputRefs.current[0].focus();
    }
  }, [showOTP]);

  // Mock API delay
  const mockAPIDelay = () => new Promise(resolve => setTimeout(resolve, 1000));

  // Mock login API function
  const handleLoginAPI = async (username, password) => {
    await mockAPIDelay();
    
    if (username === MOCK_USER.username && password === MOCK_USER.password) {
      return {
        success: true,
        message: 'Login successful'
      };
    }
    
    return {
      success: false,
      message: 'Invalid credentials'
    };
  };

  // Mock OTP verification API function
  const handleOTPVerificationAPI = async (otpString) => {
    await mockAPIDelay();
    
    // Mock OTP validation (accept any 6-digit OTP)
    // For testing purposes, we'll set a dummy OTP: 123456
    const DUMMY_OTP='789369';
    
    if (otpString === DUMMY_OTP) {
      return {
        success: true,
        message: 'OTP verified successfully'
      };
    } else if (otpString.length === 6 && /^\d+$/.test(otpString)) {
      return {
        success: false,
        message: 'Invalid OTP. For testing, use: 123456'
      };
    }
    
    return {
      success: false,
      message: 'Please enter a valid 6-digit OTP'
    };
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await handleLoginAPI(username, password);
      
      if (response.success) {
        setShowOTP(true);
        setLoading(false);
      } else {
        setError(response.message);
        setLoading(false);
      }
    } catch (err) {
      setError('Network error. Please try again.');
      setLoading(false);
    }
  };

  const handleOTPChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    if (value !== '' && index < 5) {
      otpInputRefs.current[index + 1].focus();
    }
  };

  const handleOTPKeyDown = (index, e) => {
    if (e.key === 'Backspace' && index > 0 && otp[index] === '') {
      otpInputRefs.current[index - 1].focus();
    }
  };

  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      setError('Please enter a 6-digit OTP');
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await handleOTPVerificationAPI(otpString);
      
      if (response.success) {
        setShowOTP(false);
        setLoading(false);
        window.location.href = '/dashboard';
      } else {
        setError(response.message);
        setLoading(false);
      }
    } catch (err) {
      setError('Network error. Please try again.');
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    setShowOTP(false);
    setOtp(['', '', '', '', '', '']);
    setError('');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300 flex items-center justify-center px-4">
      <Head>
        <title>{showOTP ? 'Verify OTP' : 'Login'}</title>
      </Head>
      
      <div className="w-full max-w-md">
        {!showOTP ? (
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg p-8 transition-colors duration-300">
            <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
              Welcome Back
            </h1>
            
            <form onSubmit={handleLoginSubmit}>
              <div className="space-y-6">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Username
                  </label>
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 
                             rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition 
                             text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                    placeholder="Enter your username"
                  />
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 
                             rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition 
                             text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                    placeholder="Enter your password"
                  />
                </div>
                
                {error && (
                  <div className="text-red-500 dark:text-red-400 text-sm">
                    {error}
                  </div>
                )}
                
                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg 
                             transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 
                             focus:ring-opacity-50 disabled:opacity-70"
                  >
                    {loading ? 'Logging in...' : 'Log In'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        ) : (
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg p-8 transition-colors duration-300">
            <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
              Verification Code
            </h1>
            
            <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
              We've sent a 6-digit code to your device.
              Enter it below to verify your account.
            </p>
            
            <form onSubmit={handleOTPSubmit}>
              <div className="flex justify-center gap-2 sm:gap-4 mb-8">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={el => otpInputRefs.current[index] = el}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOTPChange(index, e.target.value)}
                    onKeyDown={(e) => handleOTPKeyDown(index, e)}
                    className="w-12 h-14 text-center text-xl font-bold bg-white dark:bg-gray-700 
                             border border-gray-300 dark:border-gray-600 rounded 
                             text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 
                             focus:border-blue-500 outline-none transition"
                  />
                ))}
              </div>
              
              {error && (
                <div className="text-red-500 dark:text-red-400 text-sm text-center mb-4">
                  {error}
                </div>
              )}
              
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 
                         rounded-lg transition duration-300 focus:outline-none focus:ring-2 
                         focus:ring-blue-500 focus:ring-opacity-50 mb-4 disabled:opacity-70"
              >
                {loading ? 'Verifying...' : 'Verify'}
              </button>
              
              <button
                type="button"
                onClick={handleBackToLogin}
                className="w-full text-gray-600 dark:text-gray-400 hover:text-gray-800 
                         dark:hover:text-gray-200 text-center py-2 transition-colors"
              >
                Back to Login
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}