import React from "react";
import { useNavigate } from "react-router-dom";

import TitleDisplayCard from "../components/TitleDisplayCard";
import CallToAction from "../components/CallToAction";
import WhyChooseUs from "../components/WhyChooseUs";
import AboutCom from "../components/AboutCom";

const About = () => {
  return (
    <>
      <TitleDisplayCard title="About Us" />
      <AboutCom />
      <WhyChooseUs />
      <CallToAction />
    </>
  );
};

export default About;
