import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../style.css';

function Dashboard() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);

  // Fetch list of doctors
  useEffect(() => {
    axios.get('http://localhost:5001/api/doctors')
      .then(res => setDoctors(res.data))
      .catch(err => console.error('Error fetching doctors:', err));
  }, []);

  // Fetch user's appointments
  useEffect(() => {
    axios.get(`http://localhost:5001/api/appointments/user/${user._id}`)
      .then(res => setAppointments(res.data))
      .catch(err => console.error('Error fetching appointments:', err));
  }, [user._id]);

  const handleBook = async (doctorId) => {
    const date = prompt('Enter appointment date (YYYY-MM-DD):');
    if (!date) return;

    try {
      await axios.post('http://localhost:5001/api/appointments/book', {
        doctorId,
        userId: user._id,
        date
      });
      alert('Appointment requested successfully!');
      // Refresh appointments list
      const res = await axios.get(`http://localhost:5001/api/appointments/user/${user._id}`);
      setAppointments(res.data);
    } catch (err) {
      console.error('Booking failed:', err);
      alert('Failed to book appointment');
    }
  };

  // Helper to get doctor name from ID
  const getDoctorName = (id) => {
    const doc = doctors.find(d => d._id === id);
    return doc ? doc.name : 'Unknown';
  };

  return (
    <div className="container">
      <h2>Welcome, {user.email}</h2>

      <h3>Available Doctors</h3>
      {doctors.length === 0 ? (
        <p>No doctors found.</p>
      ) : (
        doctors.map(doc => (
          <div key={doc._id} className="card">
            <p><strong>{doc.name}</strong> ({doc.specialty}) - {doc.location}</p>
            <button onClick={() => handleBook(doc._id)}>Book Now</button>
          </div>
        ))
      )}

      <h3>Your Appointments</h3>
      {appointments.length === 0 ? (
        <p>No appointments yet.</p>
      ) : (
        appointments.map(app => (
          <div key={app._id} className="card">
            <p><strong>Doctor:</strong> {getDoctorName(app.doctorId)}</p>
            <p><strong>Date:</strong> {app.date}</p>
            <p><strong>Status:</strong> {app.status}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Dashboard;
