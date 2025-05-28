import React from 'react';
import PromptCard from '../../components/PromptCard';

const dummyPrompts = [
  { title: 'Business Growth & Profitability Strategizer', stars: 12, comments: 0, shares: 46 },
  { title: 'Industry Mapper + Opportunity Identifier', stars: 10, comments: 3, shares: 75 },
  { title: 'Collaborative Startup Blueprint Generator', stars: 6, comments: 0, shares: 21 },
];

export default function PromptGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6 py-8">
      {dummyPrompts.map((prompt, idx) => (
        <PromptCard key={idx} {...prompt} />
      ))}
    </div>
  );
}