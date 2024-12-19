// src/AuthPage.tsx

import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import './styles.css'; // Import the CSS file

const AuthPage: React.FC = () => {
  const handleLoginSuccess = (credentialResponse: any) => {
    console.log('Login Success:', credentialResponse);
    // Handle successful login (e.g., save token, redirect, etc.)
  };

  const handleLoginError = () => {
    console.log('Login Failed');
  };

  return (
    <div className="auth-container">
      <h1>Login</h1>
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={handleLoginError}
      />
    </div>
  );
};

export default AuthPage;
