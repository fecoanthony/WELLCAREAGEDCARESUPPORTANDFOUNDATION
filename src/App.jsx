// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import ServicesGrid from "./components/ServicesGrid";
import TestimonialCarousel from "./components/TestimonialCarousel";
import AboutUs from "./pages/AboutUs";
import BlogDetail from "./pages/BlogDetail";
import BlogSection, { allPosts } from "./components/BlogSection";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";

function Home() {
  return (
    <>
      <section id="home">
        <Hero />
      </section>

      <section id="services">
        <ServicesGrid />
      </section>

      <section id="blog">
        <BlogSection />
      </section>

      <section id="faq">
        <TestimonialCarousel />
      </section>

      <section id="contact">
        <Footer /> {/* You can change this later */}
      </section>
    </>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        {/* Routed pages */}
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/blog/:id" element={<BlogDetail posts={allPosts} />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
}
