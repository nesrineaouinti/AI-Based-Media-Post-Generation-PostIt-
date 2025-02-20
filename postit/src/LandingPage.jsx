import React from "react";
import Navbar from "./components/layouts/Navbar";
import HeroSection from "./components/landingPage/HeroSection";
import Features from "./components/landingPage/Features";
import About from "./components/landingPage/About";

const LandingPage = () => {
  return (
    <div>
      <HeroSection />
      <Features />
      <About />
    </div>
  );
};

export default LandingPage;
