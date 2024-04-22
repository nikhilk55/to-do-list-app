import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { login, signUp, logout } from '../auth/auth'; 

const AuthForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async () => {
    try {
      await signUp(email, password);
      console.log('Sign up successful'); // Adding console log for debugging
    } catch (error: any) { 
      setError("Enter the details correctly");
    }
  };

  const handleLogin = async () => {
    try {
      await login(email, password);
      console.log('Login successful'); 
    } catch (error: any) { 
      setError("Please Signup first");
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setEmail('');
      setPassword('');
    } catch (error: any) { 
      setError(error.message);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="mb-4">Authentication</h2>
          <form>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="button" className="btn btn-primary me-2" onClick={handleSignUp}>Sign Up</button>
            <button type="button" className="btn btn-primary" onClick={handleLogin}>Log In</button>
          </form>
          {error && <div className="alert alert-danger mt-3" role="alert" style={{fontSize: '16px'}}>{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
