
import React, { useState } from 'react';
import { Sun, Moon, Rocket } from 'lucide-react';

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(true);
  
  const toggleMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark'); 
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-gradient-to-b from-black to-gray-900">
      <div className="text-2xl font-bold text-white">Intellecta<span className="text-violet-400">Prompt</span></div>
      <ul className="flex gap-6 text-gray-300">
        <li className="cursor-pointer hover:text-white">Explore</li>
        <li className="cursor-pointer hover:text-white">Leaderboard</li>
        <li className="cursor-pointer hover:text-white">Playground</li>
      </ul>
      <div className="flex  gap-4">
        <button
          onClick={toggleMode}
          className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition"
          title="Toggle Dark/Light Mode"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <button
          className="flex gap-2 bg-violet-600 hover:bg-violet-700 transition text-white px-4 py-2 rounded-full text-sm font-medium"
          title="Upgrade to Pro"
        >
          <Rocket size={16} />
          Upgrade
        </button>
      </div>

      <div className="flex gap-4">
        <button className="text-sm px-4 py-2 border border-gray-600 rounded-full hover:bg-gray-700">Log in</button>
        <button className="text-sm px-4 py-2 bg-violet-500 rounded-full hover:bg-violet-600">Sign up</button>
      </div>
    </nav>
  );
}