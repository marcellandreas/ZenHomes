import React from "react";
import Hero from "../components/Hero";
import Feature from "../components/Feature";
import Achievements from "../components/Achievements";
import Properties from "../components/Properties";
import About from "../components/About";
import Testimonials from "../components/Testimonials";

const Home = () => {
  return (
    <main className="mx-auto max-w-[1440px] bg-gradient-to-r from-primary via-white to-white">
      <Hero />
      <Feature />
      <Achievements />
      <Properties />
      <About />
      <Testimonials />
    </main>
  );
};

export default Home;
