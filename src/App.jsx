import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProductivityStreak from "./components/ProductivityStreak";

export default function App() {
  return (
    <div className="bg-bg min-h-screen">
      <Navbar />
      <Hero />
      <ProductivityStreak />
    </div>
  );
}
