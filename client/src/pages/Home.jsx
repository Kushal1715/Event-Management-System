import React, { useEffect, useState } from "react";
import CallToAction from "../components/CallToAction";
import WhyChooseUs from "../components/WhyChooseUs";
import AboutCom from "../components/AboutCom";
import EventCard from "../components/EventCard";
import background from "/bg.png";

const Home = () => {
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
      <div className="p-[4px]">
        <div className="relative w-full h-[559px]">
          <img
            src={background}
            alt="Outer Image"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="px-4 xl:px-[180px] pt-14 pb-14">
        <h1 className="text-5xl font-bold pb-8">Recent Events:</h1>
        {events.map((event) => (
          <EventCard event={event} key={event.slug} />
        ))}
      </div>

      <AboutCom />
      <WhyChooseUs />
      <CallToAction />
    </>
  );
};

export default Home;
