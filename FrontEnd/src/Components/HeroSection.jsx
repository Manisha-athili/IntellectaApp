// components/HeroSection.jsx
import React from 'react';


export default function HeroSection() {
  return (
    <section className="  bg-[#0E0D11]bg-gradient-to-b from-black to-dark py-16 text-center text-white">
      <h1 className="text-5xl font-extrabold mb-4">Craft Perfect AI Prompts</h1>
      <p className="text-gray-400 mb-6">Discover and share powerful prompts for AI models.</p>
      <div className="flex justify-center gap-4">
        <button className="bg-violet-600 text-white px-6 py-2 rounded-full hover:bg-violet-700">Create Prompt</button>
        <button className="border border-gray-600 text-white px-6 py-2 rounded-full hover:bg-gray-700">Browse Prompts</button>
      </div>
    </section>
  );
}