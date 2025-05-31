import React, { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';

export default function SearchBar({ searchTerm, setSearchTerm,selectedOption, setSelectedOption }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const options = [
    { label: 'Newest', color: 'bg-green-400' },
    { label: 'Highest Rated', color: 'bg-purple-400' },
    { label: 'Most Forked', color: 'bg-blue-400' },
    { label: 'Most Used', color: 'bg-pink-400' },
  ];

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`flex items-center bg-[#000000] border border-[#2A2830] backdrop-blur-md rounded-xl px-3 py-3 mb-6 shadow-inner hover:shadow-[0px_0px_20px_0px_rgba(102,45,145,0.8)]  hover:border-violet-500/40 transition-shadow duration-200 m-20 pt-4 ${
  isDropdownOpen ? 'mb-33' : 'mb-6' 
}` }>
    <div  className=" flex items-center w-full bg-[#15141A] border border-[#2A2830] backdrop-blur-md rounded-xl px-3 py-3 shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.2)] hover:shadow-[0_4px_14px_0_rgba(124,58,237,0.2)] transition-shadow duration-200 hover:border-[#D8BFD8]/30
     focus-within:border-[#D8BFD8]/50 focus-within:border-2 m-2">
      <Search className="text-violet-400 mr-3" size={25} />
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search by title, description, category or prompt text..."
        className="bg-transparent outline-none text-white flex-grow placeholder-gray-400 text-lg p-1"
      />

      
    </div>
    {/* Sort Dropdown */}
      <div className="relative w-full md:w-auto " ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl border border-[#2A2830] bg-[#1D1B24] text-white hover:shadow-[0px_0px_60px_0px_rgba(102,45,145,0.9)] active:shadow-xl transition  w-full md:w-48 m-2"
        >
          <span
            className={`w-3 h-3  rounded-full ${
              options.find((opt) => opt.label === selectedOption)?.color
            }`}
          />
          <span className="text-base p-1">{selectedOption}</span>
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isDropdownOpen && (
          <div className=" absolute bottom-0 mb-2 w-full md:w-48 rounded-xl border border-[#2A2830] bg-[#1C1B23] text-sm shadow-[0_10px_25px_rgba(0,0,0,0.3)]">
            <ul className="divide-y divide-[#2A2830]">
              {options.map(({ label, color }) => (
                <li
                  key={label}
                  onClick={() => {
                    setSelectedOption(label);
                    setIsDropdownOpen(false);
                  }}
                  className={`flex items-center gap-2 px-4 py-2 cursor-pointer transition ${
                    label === selectedOption ? 'bg-[#2A2830]' : 'hover:bg-[#2A2830]'
                  }`}
                >
                  <span className={`w-3 h-3 rounded-full ${color}`} />
                  <span className="text-white text-base">{label}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
