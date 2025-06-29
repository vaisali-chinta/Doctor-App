import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../style.css';

function Register() {
  const [form, setForm] = useState({ email: '', password: '', role: 'user' });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:5001/api/auth/register', form);
      alert('Registered successfully!');
      navigate('/login');
    } catch (err) {
      alert('Registration failed');
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} />
      <select name="role" onChange={handleChange} value={form.role}>
        <option value="user">User</option>
        <option value="doctor">Doctor</option>
      </select>
      <button onClick={handleSubmit}>Register</button>
      <button className="link" onClick={() => navigate('/login')}>
        Already have an account? Login
      </button>
    </div>
  );
}

export default Register;
