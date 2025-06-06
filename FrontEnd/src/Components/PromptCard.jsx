import React, { useState } from 'react';
import { GitFork, Star, Link, MoveUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PromptCard({ 
  id,
  title, 
  description, 
  categories,
  copiedCount,
  forkCount, 
  stars, 
  createdAt,
  author = "someone" 
}) {
  const [isHovered, setIsHovered] = useState(false);

  const navigate = useNavigate(); 
  // const handleClick = () => {
  //   // {console.log(prompt.key)}
  //   navigate(`/prompts/${id}`); 
  // };

  return (
    <div 
       onClick={()=>navigate(`/prompts/${id}`)}
      className="cursor-pointer relative bg-gradient-to-br from-[#1c0f31] to-[#120824] text-white rounded-2xl shadow-md p-5 w-full max-w-md transition-all duration-300 ease-in-out hover:scale-[1.05] border-2 border-[#3e275c] overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}

    >
      {/* Animated top border */}
      <div className={`
        absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-violet-500 to-purple-400
        transition-all duration-300 ease-in-out
        ${isHovered ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}
      `} />
      
      {/* Card content */}
      <div className="relative z-10">
        <div className='flex justify-between'>
          <h2 className="text-xl font-bold mb-2 transition-colors duration-300 hover:text-violet-300">
            {title}
          </h2>

          <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1 transition-colors hover:text-yellow-400">
                <Star size={16} className="text-yellow-400" /> {stars.length}
              </span>
              <span className="flex items-center gap-1 transition-colors hover:text-blue-400">
                <GitFork size={16} className="text-blue-400" /> {forkCount}
              </span>
              <span className="flex items-center gap-1 transition-colors hover:text-purple-400">
                <Link size={16} className="text-purple-400" /> {copiedCount}
              </span>
            </div>
          </div>
        </div>

        <p className="text-sm font-medium text-gray-300 mb-4 transition-colors duration-300 hover:text-gray-100">
          {description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {categories && categories.map(cat => (
            <span 
              key={cat} 
              className="text-sm font-medium px-3 py-1 bg-[#2e1b4b] text-violet-300 rounded-full border border-violet-300/30 transition-all duration-300 hover:bg-[#3d2563] hover:border-violet-400 hover:text-white"
            >
              {cat}
            </span>
          ))}
        </div>
        
        <div className="border-t border-[#3e275c] pt-3 text-xs flex justify-between items-center text-gray-500">
          <span className="transition-colors duration-300 hover:text-violet-300">by {author}</span>
          <div className='flex items-center transition-transform duration-300 hover:translate-x-1'>
            <span className='mr-2 transition-colors duration-300 hover:text-white'>{createdAt}</span> 
            <MoveUpRight size={13} className="text-violet-300 transition-colors duration-300 group-hover:text-white" />
          </div>
        </div>
      </div>

      {/* Background shine effect */}
      <div className={`
        absolute inset-0 bg-gradient-to-r from-transparent via-violet-900/20 to-transparent
        opacity-0 transition-opacity duration-500
        ${isHovered ? 'opacity-200' : 'opacity-0'}
      `} />
    </div>
  );
}