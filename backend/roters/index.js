const express = require('express');
const router = express.Router();
const controller = require('../controlers');

// Auth
router.post('/auth/register', controller.register);
router.post('/auth/login', controller.login);

// Doctor
router.get('/doctors', controller.getDoctors);
router.post('/doctors/register', controller.registerDoctor);

// Appointments
router.post('/appointments/book', controller.bookAppointment);
router.get('/appointments/user/:id', controller.getAppointmentsByUser);
router.get('/appointments/doctor/:id', controller.getAppointmentsByDoctor);

module.exports = router;
