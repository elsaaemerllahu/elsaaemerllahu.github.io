// src/pages/Signup/Signup.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../Login/Login.css'; // reuse login styles
import bgImg from "../../assets/taskspark-table.png";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/backend/signup.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.message === 'Signup successful.') {
        navigate('/login');
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('Error signing up.');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-left">
        <form onSubmit={handleSubmit} className="login-box">
          <div className="login-heading">
            <h1>Create an Account</h1>
            <p>Please fill in your details to sign up</p>
          </div>

          <div className="login-info">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">Sign Up</button>
          {message && <p className="login-error">{message}</p>}

          <div className="create-account">
            <p>Already have an account?</p>
            <a className='sign-up-link'>
              <Link to="/login">Login</Link>
            </a>
          </div>
        </form>
      </div>

      <div
        className="login-right"
        style={{
          backgroundImage: `url(${bgImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <h1>TaskSpark</h1>
        <p>Create an account to start organizing your tasks and boosting productivity.</p>
      </div>
    </div>
  );
};

export default Signup;
