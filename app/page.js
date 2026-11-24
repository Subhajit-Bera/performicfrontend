"use client";
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import FeaturedUniversities from './components/FeaturedUniversities';
import WhyPerformic from './components/WhyPerformic';
import UpcomingExams from './components/UpcomingExams';
import CareerOptions from './components/CareerOptions';
import CareerPartners from './components/CareerPartners';
import Testimonials from './components/Testimonials';
import FaqSection from './components/FaqSection';
import CtaBand from './components/CtaBand';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div className="relative">
      <Header />
      <main id="main-content">
        <Hero />
        <FeaturedUniversities />
        <WhyPerformic />
        <UpcomingExams />
        <CareerOptions />
        <CareerPartners />
        <Testimonials />
        <FaqSection />
        <CtaBand />
      </main>
      <Footer />
    </div>
  );
}