import express from 'express'
import { verifyToken } from '../utils/verifyUser.js';
import { create, deleteevent, getevents, updateevent } from '../controllers/event.controller.js';

const router = express.Router();

router.post('/create', verifyToken, create)
router.get("/getevents", getevents)
router.delete('/deleteevent/:eventId/:userId', verifyToken, deleteevent)
router.put('/updateevent/:eventId/:userId', verifyToken, updateevent)

export default router;