const { User, Doctor, Appointment } = require('../models');

const register = async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.send(user);
};

const login = async (req, res) => {
  const user = await User.findOne(req.body);
  user ? res.send(user) : res.status(400).send('Invalid');
};

const getDoctors = async (req, res) => {
  const doctors = await Doctor.find();
  res.send(doctors);
};

const registerDoctor = async (req, res) => {
  const doctor = new Doctor(req.body);
  await doctor.save();
  res.send(doctor);
};

const bookAppointment = async (req, res) => {
  const appointment = new Appointment(req.body);
  await appointment.save();
  res.send(appointment);
};

const getAppointmentsByUser = async (req, res) => {
  const appointments = await Appointment.find({ userId: req.params.id });
  res.send(appointments);
};

const getAppointmentsByDoctor = async (req, res) => {
  const appointments = await Appointment.find({ doctorId: req.params.id });
  res.send(appointments);
};

module.exports = {
  register,
  login,
  getDoctors,
  registerDoctor,
  bookAppointment,
  getAppointmentsByUser,
  getAppointmentsByDoctor
};
