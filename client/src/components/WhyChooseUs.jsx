import React from "react";

const WhyChooseUs = () => {
  return (
    <div className="px-4 xl:px-[180px] pt-14 pb-14">
      <div className="text-center pb-14">
        <h3 className="text-xl font-semibold pb-4">Why Us</h3>
        <h1 className="font-bold text-blue-500 text-3xl pb-4">Why Choose Us</h1>
        <p className="text-2xl max-w-[500px] mx-auto">
          Choose us for seamless event planning, secure payments, and engaging
          features that make every event effortless and memorable.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="py-7 px-14 border-4 text-center md:text-left">
          <h1 className="font-bold text-2xl pb-3 ">
            Comprehensive Event Solutions
          </h1>
          <p className="text-xl">
            Our platform offers end-to-end event management features, from
            planning and registration to ticket sales simplifying your event
            workflow.
          </p>
        </div>
        <div className="py-7 px-14 border-4 text-center md:text-left">
          <h1 className="font-bold text-2xl pb-3 ">User-Friendly Interface</h1>
          <p className="text-xl">
            Designed with ease of use in mind, our system ensures that event
            organizers and participants can navigate and interact without
            hassle, enhancing the overall experience.
          </p>
        </div>
        <div className="py-7 px-14 border-4 text-center md:text-left">
          <h1 className="font-bold text-2xl pb-3 ">
            Secure Payment Integration
          </h1>
          <p className="text-xl">
            We provide secure and efficient payment options, including eSewa, to
            ensure a seamless transaction process for organizers and attendees.
          </p>
        </div>
        <div className="py-7 px-14 border-4 text-center md:text-left">
          <h1 className="font-bold text-2xl pb-3 ">
            Dedicated Customer Support
          </h1>
          <p className="text-xl">
            Our responsive support team is available to assist you at every
            step, ensuring your event runs smoothly and any challenges are
            quickly addressed.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
