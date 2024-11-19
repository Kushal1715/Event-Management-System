import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createRegistration, deleteRegistration, getRegistrationById, getRegistrations, updateRegistration, verifyEsewaPayment } from '../controllers/registration.controller.js';

const router = express.Router();

router.post('/register', verifyToken, createRegistration);

router.get('/registrations', verifyToken, getRegistrations);


router.get("/:registrationId", verifyToken, getRegistrationById);

router.put('/update-registration/:registrationId', verifyToken, updateRegistration);

router.delete('/delete-registration/:registrationId', verifyToken, deleteRegistration);

router.post('/verify-esewa-payment', verifyEsewaPayment);
export default router;
