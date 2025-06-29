import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../style.css';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

 const handleSubmit = async () => {
  try {
    const res = await axios.post('http://localhost:5001/api/auth/login', form);
    localStorage.setItem('user', JSON.stringify(res.data));
    alert('Login successful!');

    if (res.data.role === 'doctor') {
      navigate('/doctor-dashboard'); // 👈 redirect to doctor dashboard
    } else {
      navigate('/dashboard'); // 👈 redirect to user dashboard
    }
  } catch (err) {
    alert('Login failed');
    console.error(err);
  }
};


  return (
    <div className="container">
      <h2>Login</h2>
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} />
      <button onClick={handleSubmit}>Login</button>
      <button className="link" onClick={() => navigate('/')}>
        Don’t have an account? Sign Up
      </button>
    </div>
  );
}

export default Login;
