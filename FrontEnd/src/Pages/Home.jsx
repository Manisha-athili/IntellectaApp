

import React, { useEffect, useState } from 'react';
import { fetchPrompts, savePrompt } from '../Features/Prompts/PromptService';
import PromptCard from '../components/PromptCard';

const Home = () => {
  const [prompts, setPrompts] = useState([]);
  const [newPrompt, setNewPrompt] = useState('');
  const [loading, setLoading] = useState(true);

  const loadPrompts = async () => {
    const data = await fetchPrompts();
    setPrompts(data);
    setLoading(false);
  };

  useEffect(() => {
    loadPrompts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newPrompt.trim()) return;

    const saved = await savePrompt(newPrompt);
    setPrompts([saved, ...prompts]); // update list
    setNewPrompt('');
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Save a Prompt</h1>

      <form onSubmit={handleSubmit} className="mb-6">
        <textarea
          value={newPrompt}
          onChange={(e) => setNewPrompt(e.target.value)}
          className="w-full p-2 border rounded mb-2"
          rows={3}
          placeholder="Enter your prompt..."
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Save Prompt
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-2">Saved Prompts</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="space-y-3">
          {prompts.map((p) => (
            <PromptCard key={p._id} prompt={p} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
