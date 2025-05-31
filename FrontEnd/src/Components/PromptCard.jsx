// components/PromptCard.jsx
import React from 'react';
import { MessageSquare, Share2, Star,Link2 } from 'lucide-react';

export default function PromptCard({ title, stars, comments, shares }) {
  return (
    <div className="bg-gray-900 p-4 rounded-xl shadow-md hover:shadow-xl transition-all">
      <h3 className="text-lg font-semibold mb-2 text-white">{title}</h3>
      <div className="flex items-center gap-4 text-gray-400 text-sm">
        <div className="flex items-center gap-1"><Star size={16} /> {stars}</div>
        <div className="flex items-center gap-1"><MessageSquare size={16} /> {comments}</div>
        <div className="flex items-center gap-1"><Share2 size={16} /> {shares}</div>
      </div>
    </div>
  );
}