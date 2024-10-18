import React, { useState } from 'react';
import './Signup.css';

const Signup = () => {
  const [passwordShown, setPasswordShown] = useState(false);

  // Toggle password visibility
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <div className="container">
      <div className="left-section">
        <h1>Signup To Intellicourse</h1>
        <img src="/rocket.jpg" alt="Rocket" className="rocket-image" />
      </div>
      <div className="right-section">
        <form className="signup-form">
          <h2>Sign up</h2>
          <div className="input-field">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" placeholder="Your name" required />
          </div>
          <div className="input-field">
            <label htmlFor="email">Email address</label>
            <input type="email" id="email" placeholder="example@gmail.com" required />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input
              type={passwordShown ? "text" : "password"}
              id="password"
              placeholder="Enter password"
              required
            />
            <span className="show-password" onClick={togglePassword}>👁</span>
          </div>
          <div className="checkbox-field">
            <input type="checkbox" id="terms" required />
            <label htmlFor="terms">
              I agree to the <a href="#">Platform’s Terms of Service</a> and <a href="#">Privacy Policies</a>
            </label>
          </div>
          <button type="submit" className="submit-btn">Create account</button>
          <p>or sign up with</p>
          <div className="social-login">
            <button className="social-btn google">G</button>
            <button className="social-btn facebook">f</button>
          </div>
          <p>Already have an account? <a href="#">Log in</a></p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
