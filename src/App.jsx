import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

export default function App() {
  return (
    <div className="portfolio-page bg-bg min-h-screen">
      <Navbar />
      <main className="portfolio-content max-w-5xl mx-auto px-6">
        <Hero />
      </main>
    </div>
  );
}
