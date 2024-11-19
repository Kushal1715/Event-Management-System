import React from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import about1 from "/about/about1.jpg";
import { useNavigate } from "react-router-dom";

const AboutCom = () => {
  const navigate = useNavigate();

  return (
    <div className="px-4 xl:px-[180px] pt-14 pb-14">
      <div className="flex flex-col gap-3 xl:gap-4">
        <h1 className="pl-6 font-semibold text-xl">About Us</h1>
        <div className="flex md:flex-row flex-col justify-center items-center xl:items-start flex-wrap ">
          <div className="md:w-1/2 px-6 flex flex-col gap-6 md:pr-20">
            <h1 className="font-bold text-3xl lg:text-3xl 2xl:text-4xl ">
              Our Story – Connecting People Through Events
            </h1>
            <p className="text-xl lg:text-xl 2xl:text-2xl">
              Founded with the passion to transform event experiences, NexVenue
              was created to bridge the gap between event organizers and their
              audiences. We bring together innovation and simplicity, offering
              intuitive tools for planning, managing, and attending events. Join
              us on this journey as we redefine event management, making it more
              interactive, accessible, and impactful.
            </p>
            <div className="flex gap-2  items-center justify-center sm:justify-start">
              <div className="flex flex-col border-2 p-4 px-10 items-center rounded-lg">
                <span className="font-bold text-3xl">
                  8K<span className="text-blue-500">+</span>
                </span>{" "}
                Events Completed
              </div>
              <div className="flex flex-col border-2 p-4 items-center rounded-lg">
                <span className="font-bold text-3xl">
                  10<span className="text-blue-500">K+</span>
                </span>{" "}
                Total Events
              </div>
            </div>
            <div>
              <button
                className="py-3 px-8 border-2 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white flex text-lg"
                onClick={() => navigate("/events")}
              >
                Check events
                <MdKeyboardArrowRight className="mt-[6px] ml-1" />
              </button>
            </div>
          </div>
          <div className="md:w-1/2 pt-10 md:pt-0">
            <div>
              <img src={about1} alt="about 1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutCom;
