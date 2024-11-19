import mongoose from 'mongoose';

const registrationSchema = new mongoose.Schema(
  {
    eventSlug: {
      type: String,
      required: true,
      ref: 'Event', // Reference to the Event model
    },
    userId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      match: /.+\@.+\..+/,
    },
    phone: {
      type: String,
      required: true,
    },
    ticketsBooked: {
      type: Number,
      required: true,
      min: 1, // Ensure at least one ticket is booked
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    registrationDate: {
      type: Date,
      default: Date.now, // Store the current date and time of registration
    },
    status: {
      type: String,
      default: 'pending', // Could be 'pending', 'confirmed', etc.
    },
  },
  { timestamps: true }
);

const Registration = mongoose.model('Registration', registrationSchema);

export default Registration;
