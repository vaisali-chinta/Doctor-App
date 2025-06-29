import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../style.css';

function DoctorDashboard() {
  const doctor = JSON.parse(localStorage.getItem('user'));
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5001/api/appointments/doctor/${doctor._id}`)
      .then(res => setAppointments(res.data))
      .catch(err => console.error('Failed to load appointments', err));
  }, [doctor._id]);

  return (
    <div className="container">
      <h2>Welcome, Dr. {doctor.email}</h2>
      <h3>Your Appointments</h3>
      {appointments.length === 0 ? (
        <p>No appointments received yet.</p>
      ) : (
        appointments.map(app => (
          <div key={app._id} className="card">
            <p><strong>Patient ID:</strong> {app.userId}</p>
            <p><strong>Date:</strong> {app.date}</p>
            <p><strong>Status:</strong> {app.status}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default DoctorDashboard;
