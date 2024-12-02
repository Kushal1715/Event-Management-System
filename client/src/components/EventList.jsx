import React, { useState, useEffect } from "react";

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

function EventList() {
  const [userLocation, setUserLocation] = useState(null);
  const [events, setEvents] = useState([
    {
      content:
        "Join us for the AI Innovations Conference where industry leaders share insights on the future of artificial intelligence.",
      name: "AI Innovations Conference",
      lat: 27.7172,
      lon: 85.324,
      venue: "Kathmandu Expo Center",
      time: "10:00 AM",
      ticketPrice: 300,
    },
    {
      content:
        "Explore groundbreaking startups and their innovative solutions at the Startup Expo.",
      name: "Startup Expo",
      lat: 27.6725,
      lon: 85.4278,
      venue: "Startup Hub, Bhaktapur",
      time: "11:00 AM",
      ticketPrice: 200,
    },
    {
      content:
        "Learn digital marketing strategies and trends at the Digital Marketing Summit.",
      name: "Digital Marketing Summit",
      lat: 27.6948,
      lon: 85.326,
      venue: "Hotel Kathmandu View",
      time: "1:00 PM",
      ticketPrice: 250,
    },
    {
      content:
        "Learn digital marketing strategies and trends at the Digital Marketing Summit.",
      name: "Digital kalanki Summit",
      lat: 27.69375484478852,
      lon: 85.28065561685837,

      venue: "Hotel Kathmandu View",
      time: "1:00 PM",
      ticketPrice: 250,
    },
    {
      content:
        "Join us for an interactive workshop with tech gurus sharing insights on AI and machine learning!",
      name: "Tech Gurus Workshop",
      lat: 27.7102,
      lon: 85.2819,
      venue: "Kathmandu Business Hub",
      time: "10:00 AM",
      ticketPrice: 500,
    },
  ]);
  const [nearbyEvents, setNearbyEvents] = useState([]);
  const radius = 100; // Radius in km

  // Step 1: Get user's current location
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
          setUserLocation({ lat: 27.7172, lon: 85.324 }); // Default to Kathmandu
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
      // Fallback to static coordinates
      setUserLocation({ lat: 27.7172, lon: 85.324 }); // Default to Kathmandu
    }
  }, []);

  // Step 2: Filter events based on proximity
  useEffect(() => {
    if (userLocation) {
      // Step 1: Map events to include distance
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
        .filter((event) => event.distance <= radius); // Step 2: Filter by radius

      // Step 3: Sort by distance
      const sortedEvents = filteredEvents.sort(
        (a, b) => a.distance - b.distance
      );

      console.log("Sorted Nearby Events:", sortedEvents); // Debugging
      setNearbyEvents(sortedEvents); // Step 4: Set state
    }
  }, [userLocation, events]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Nearby Events</h2>
      {nearbyEvents.length === 0 ? (
        <p className="text-gray-500">No nearby events found.</p>
      ) : (
        <ul className="space-y-4">
          {nearbyEvents.map((event, index) => (
            <li key={index} className="p-4 border rounded-lg">
              <h3 className="text-lg font-semibold">{event.name}</h3>
              <p>{event.content}</p>
              <p>
                <strong>Venue:</strong> {event.venue}
              </p>
              <p>
                <strong>Time:</strong> {event.time}
              </p>
              <p>
                <strong>Ticket Price:</strong> Rs. {event.ticketPrice}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default EventList;
