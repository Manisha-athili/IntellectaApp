import { useState } from 'react';
import { API_BASE_URL } from '../features/prompts/promptService';

export default function PromptForm() {
  const [inputPrompt, setInputPrompt] = useState('');
  const [optimizedPrompts, setOptimizedPrompts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setOptimizedPrompts([]);
    setError('');

    try {
      const res = await fetch(`${API_BASE_URL}/api/prompts/optimize`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: inputPrompt }),
      });

      const data = await res.json();
      if (res.ok) {
        const parts = data.optimized.split(/\n?\d\.\s+/).filter(Boolean); // Split if AI returns numbered list
        setOptimizedPrompts(parts);
      } else {
        setError(data.error || 'Something went wrong');
      }
    } catch (err) {
      setError(err.message || 'Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="mb-6">
        <textarea
          value={inputPrompt}
          onChange={(e) => setInputPrompt(e.target.value)}
          className="w-full p-4 border rounded-lg shadow resize-none min-h-[120px]"
          placeholder="Enter your raw prompt..."
        />
        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          disabled={loading || !inputPrompt.trim()}
        >
          {loading ? 'Optimizing...' : 'Optimize Prompt'}
        </button>
      </form>

      {error && (
        <div className="text-red-600 mb-4">
          {error}
        </div>
      )}

      <div className="space-y-4">
        {optimizedPrompts.map((opt, idx) => (
          <div key={idx} className="p-4 bg-gray-100 rounded-lg shadow">
            <h3 className="font-semibold text-lg mb-2">Optimized Prompt {idx + 1}</h3>
            <p>{opt}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
