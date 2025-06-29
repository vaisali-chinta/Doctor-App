const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  role: { type: String, enum: ['user', 'doctor', 'admin'] }
});

const DoctorSchema = new mongoose.Schema({
  name: String,
  specialty: String,
  location: String,
  availableSlots: [String]
});

const AppointmentSchema = new mongoose.Schema({
  doctorId: mongoose.Schema.Types.ObjectId,
  userId: mongoose.Schema.Types.ObjectId,
  date: String,
  document: String,
  status: { type: String, default: 'pending' }
});

const User = mongoose.model('User', UserSchema);
const Doctor = mongoose.model('Doctor', DoctorSchema);
const Appointment = mongoose.model('Appointment', AppointmentSchema);

module.exports = { User, Doctor, Appointment };