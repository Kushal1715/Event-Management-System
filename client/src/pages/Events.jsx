import React, { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import TitleDisplayCard from "../components/TitleDisplayCard";

const Events = () => {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    const fetchEvents = async () => {
      const res = await fetch("/api/event/getEvents");
      const data = await res.json();
      setEvents(data.events);
    };
    fetchEvents();
  }, []);
  return (
    <>
      <TitleDisplayCard title="Join Events" />
      <div className="px-4 xl:px-[180px] pt-14 pb-14">
        {events.map((event) => (
          <EventCard event={event} key={event.slug} />
        ))}
      </div>
    </>
  );
};

export default Events;
