import React from 'react';
import { Filter, Tag } from 'lucide-react';

const categories = [
  'All Prompts',
  'Business',
  'RepoPrompt',
  'Writing',
  'Programming',
  'Marketing',
  'Design',
  'Productivity',
  'Cursor Rules',
  'MetaPrompting',
  'Personal Growth',
];

export default function FilterBar({ selectedCategory, setSelectedCategory }) {
  return (
    <div className="  bg-[#000000] border border-[#2A2830] backdrop-blur-md rounded-xl p-6 shadow-inner mb-10 hover:shadow-[0px_0px_30px_0px_rgba(102,45,145,0.8)]  hover:border-violet-500/50 transition-shadow duration-200 m-20 pt-4 ">
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
        <Filter size={18} className="text-violet-400" />
        <span className="font-semibold text-white text-lg">Filter by category</span>
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-300 mb-4">
        <Tag size={16} className="text-violet-400 " />
        <span className=' text-white text-base'> Filter by:</span>
      </div>

      <div className="flex flex-wrap gap-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 m-1 rounded-full border font-semibold text-base  text-white transition-all duration-200 ${
              selectedCategory === cat
                ? 'bg-gradient-to-r from-purple-500 to-violet-500 text-white shadow-[0_4px_8px_rgba(238,130,238,0.4)] active:bg-violet-700 '
                : 'bg-[#1C1B23] border border-[#2A2830] text-white hover:border-violet-500 hover:shadow-[0_0_8px_rgba(238,130,238,0.4)] active:bg-violet-700 '
            }`}
          >
            {selectedCategory === cat && <span className="mr-1">✔</span>}
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
