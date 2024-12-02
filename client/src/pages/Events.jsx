import React, { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import TitleDisplayCard from "../components/TitleDisplayCard";

// Function to convert degrees to radians
function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

// Function to calculate the distance between two points using the Haversine Formula
function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  const radianLat1 = toRadians(lat1);
  const radianLon1 = toRadians(lon1);
  const radianLat2 = toRadians(lat2);
  const radianLon2 = toRadians(lon2);

  const deltaLat = radianLat2 - radianLat1;
  const deltaLon = radianLon2 - radianLon1;

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(radianLat1) *
      Math.cos(radianLat2) *
      Math.sin(deltaLon / 2) *
      Math.sin(deltaLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
}

const Events = () => {
  const [events, setEvents] = useState([]);
  const [nearbyEvents, setNearbyEvents] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const radius = 100; // Radius in km

  // Fetch all events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("/api/event/getEvents");
        const data = await res.json();
        setEvents(data.events);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLon = position.coords.longitude;
          setUserLocation({ lat: userLat, lon: userLon });
        },
        (error) => {
          console.error("Error getting location:", error);
          // Fallback to static coordinates if location fails
          setUserLocation({ lat: 27.7172, lon: 85.324 });
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
      setUserLocation({ lat: 27.7172, lon: 85.324 });
    }
  }, []);

  // Filter events based on proximity
  useEffect(() => {
    if (userLocation && events.length > 0) {
      const filteredEvents = events
        .map((event) => {
          const distance = haversine(
            userLocation.lat,
            userLocation.lon,
            event.lat,
            event.lon
          );
          return { ...event, distance }; // Add distance to event object
        })
        .filter((event) => event.distance <= radius) // Filter by radius
        .sort((a, b) => a.distance - b.distance); // Sort by distance

      setNearbyEvents(filteredEvents);
    }
  }, [userLocation, events]);
  console.log(nearbyEvents);

  return (
    <>
      <TitleDisplayCard title="Join Events" />
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Nearby Events</h2>
        {nearbyEvents.length === 0 ? (
          <p className="text-gray-500">No nearby events found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {nearbyEvents.map((event) => (
              <EventCard event={event} key={event.slug} />
            ))}
          </div>
        )}
      </div>
      <div className="px-4 xl:px-[180px] pt-14 pb-14 grid grid-cols-1 md:grid-cols-2 gap-8">
        {events.map((event) => (
          <EventCard event={event} key={event.slug} />
        ))}
      </div>
    </>
  );
};

export default Events;
