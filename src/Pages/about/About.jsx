import React from "react";
import AboutHero from "./aboutHero/AboutHero";
import Story from "./story/Story";
import MissionVision from "./mission/MissionVision";
import WhyChooseUs from "./whyChoose/WhyChooseUs";
import StatsSection from "./state/StatsSection";
import Cta from "../home/Cta";

const About = () => {
  return (
    <div className="pt-16 lg:pt-20">
      <AboutHero />
      <Story />
      <MissionVision />
      <WhyChooseUs />
      <StatsSection />
      <Cta />
    </div>
  );
};

export default About;
