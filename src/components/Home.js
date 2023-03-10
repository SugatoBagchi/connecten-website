import React from "react";
import Dashboard from "./Dashboard.js";
import Navbar from "./Navbar.js";
import Features from "./Features.js";
import QRGenerator from "./QRGenerator.js";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Dashboard />
      <Features />
      <QRGenerator />
    </div>
  );
};

export default Home;
