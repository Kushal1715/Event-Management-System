import Registration from '../models/registration.model.js';
import Event from '../models/event.model.js';
import { errorHandler } from '../utils/error.js';
import axios from 'axios'


// Create a new registration
export const createRegistration = async (req, res, next) => {
  const { eventSlug, userId, name, email, phone, ticketsBooked } = req.body;

  try {
    // Check if event exists
    const event = await Event.findOne({ slug: eventSlug });
    if (!event) {
      return next(errorHandler(404, 'Event not found'));
    }

    // Check if enough tickets are available
    if (ticketsBooked > event.availableTickets) {
      return next(errorHandler(400, 'Not enough tickets available'));
    }

    // Calculate total price for the tickets
    const totalPrice = ticketsBooked * event.ticketPrice;

    // Create a new registration
    const registration = new Registration({
      eventSlug,
      userId,
      name,
      email,
      phone,
      ticketsBooked,
      totalPrice,
    });

    // Save the registration to the database
    const savedRegistration = await registration.save();

    // Update the event's available tickets
    event.availableTickets -= ticketsBooked;
    await event.save();

    res.status(201).json(savedRegistration);
  } catch (error) {
    next(error);
  }
};

// Get all registrations for a specific event or user
export const getRegistrations = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const registrations = await Registration.find({
      ...(req.query.eventSlug && { eventSlug: req.query.eventSlug }),
      ...(req.query.userId && { userId: req.query.userId }),
    })
      .skip(startIndex)
      .limit(limit);

    const totalRegistrations = await Registration.countDocuments();

    res.status(200).json({
      registrations,
      totalRegistrations,
    });
  } catch (error) {
    next(error);
  }
};

export const getRegistrationById = async (req, res, next) => {
  const { registrationId } = req.params;

  try {
    // Find the registration by ID
    const registration = await Registration.findById(registrationId);

    if (!registration) {
      return next(errorHandler(404, 'Registration not found'));
    }

    // Respond with the registration details
    res.status(200).json(registration);
  } catch (error) {
    next(error);
  }
};

export const getRegistrationsByUserId = async (req, res, next) => {
  const { userId } = req.params;

  try {
    // Find registrations by user ID
    const registrations = await Registration.find({ userId });

    if (!registrations || registrations.length === 0) {
      return next(errorHandler(404, 'No registrations found for this user'));
    }

    // Respond with the list of registrations
    res.status(200).json(registrations);
  } catch (error) {
    next(error);
  }
};

// Update registration status
export const updateRegistration = async (req, res, next) => {
  const { registrationId } = req.params;
  const { status } = req.body; // new status for the registration

  try {
    // Check if registration exists
    const registration = await Registration.findById(registrationId);
    if (!registration) {
      return next(errorHandler(404, 'Registration not found'));
    }

    // Update registration status
    registration.status = status;
    const updatedRegistration = await registration.save();

    res.status(200).json(updatedRegistration);
  } catch (error) {
    next(error);
  }
};

// Delete a registration
export const deleteRegistration = async (req, res, next) => {
  const { registrationId } = req.params;

  try {
    // Find and delete the registration
    const registration = await Registration.findById(registrationId);
    if (!registration) {
      return next(errorHandler(404, 'Registration not found'));
    }

    // Restore available tickets for the event
    const event = await Event.findOne({ slug: registration.eventSlug });
    if (event) {
      event.availableTickets += registration.ticketsBooked;
      await event.save();
    }

    await Registration.findByIdAndDelete(registrationId);
    res.status(200).json('The registration has been deleted');
  } catch (error) {
    next(error);
  }
};

export const verifyEsewaPayment = async (req, res, next) => {
  const { amt, rid, pid, scd } = req.body; // Payment details from frontend

  try {
    // Make the API call to Esewa for payment verification
    const response = await axios.post('https://uat.esewa.com.np/epay/main', {
      amt,
      rid,
      pid,
      scd,
    });

    // Check if the response from Esewa is valid
    if (response.data.status === 'success') {
      // Payment is verified
      const registration = await Registration.findByIdAndUpdate(rid, { status: 'paid' }, { new: true });

      return res.json({
        message: "Payment verified and status updated",
        data: registration,
      });
    } else {
      return res.status(400).json({ message: "Payment verification failed" });
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    return res.status(500).json({ message: "An error occurred during payment verification." });
  }
};
