import React from "react";
import { Button, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import EventCard from "../components/EventCard";
import DOMPurify from "dompurify";

const EventDetails = () => {
  const { eventSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [event, setEvent] = useState(null);
  const [recentEvents, setRecentEevents] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/event/getevents?slug=${eventSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setEvent(data.events[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchEvent();
  }, [eventSlug]);

  useEffect(() => {
    const fetchRecentEvents = async () => {
      try {
        const res = await fetch(`/api/event/getevents?limit=3`);
        const data = await res.json();
        if (res.ok) {
          setRecentEevents(data.events);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchRecentEvents();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen text-xl">
        Something went wrong. Please try again later.
      </div>
    );

  return (
    <div className="container mx-auto px-4 xl:px-20 py-16">
      {/* Event Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          {/* Event Image */}
          <img
            src={event.image}
            alt={event.title}
            className="max-w-full h-[40vh] md:h-[60vh] xl:h-[70vh] rounded-lg"
          />
        </div>
        <div>
          <h1 className="text-5xl font-bold mb-6">{event.title}</h1>
          <p className="text-3xl font-bold mb-4">Rs. {event.ticketPrice}</p>
          <div
            className="text-lg mb-6"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(event.content),
            }}
          ></div>
          <div className="flex justify-between items-center mb-4">
            <p className="text-xl font-semibold">
              Date: {new Date(event.date).toDateString()}
            </p>
            <p className="text-xl font-semibold">Time: {event.time}</p>
            <p className="text-xl font-semibold">Duration: {event.duration}</p>
          </div>
          <p className="text-xl font-semibold mb-4">
            Organized By: {event.organizerName}
          </p>
          <p className="text-xl font-semibold mb-4">
            Contact Info: {event.contactInfo}
          </p>
          <p className="text-xl font-semibold mb-4">Venue: {event.venue}</p>
          <p className="text-xl font-semibold mb-4">
            Available Tickets: {event.availableTickets}
          </p>
          <div className="flex justify-between items-center mb-6">
            <p className="text-xl font-semibold">
              Registration Deadline:{" "}
              {new Date(event.registrationDate).toDateString()}
            </p>
            <p className="text-xl font-semibold">
              Time: {event.registrationTime}
            </p>
          </div>

          <Link to={`/register-event/${eventSlug}`}>
            <button className="mt-4 w-full py-2 text-xl bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-semibold">
              Join this Event
            </button>
          </Link>
        </div>
      </div>

      {/* Recent Events */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6">More Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentEvents?.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
