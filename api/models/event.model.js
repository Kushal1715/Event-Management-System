import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true,
    },
    venue: {
      type: String,
      required: true
    },
    time: {
      type: String,
      required: true
    },
    ticketPrice: {
      type: Number,
      required: true
    },
    registrationTime: {
      type: String,
      required: true
    },
    registrationDate: {
      type: Date,
      required: true
    },
    organizerName: {
      type: String,
      required: true
    },
    duration: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    contactInfo: {
      type: String,
      required: true
    },

    availableTickets: {
      type: Number,
      required: true
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Event = mongoose.model('Event', eventSchema);

export default Event;