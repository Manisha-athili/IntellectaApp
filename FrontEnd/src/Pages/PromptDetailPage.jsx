import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from '../Components/CommonUI/button';
import { Card, CardContent } from '../Components/CommonUI/card';
import { Copy, Share2, Sparkle, Star, Layers, ArrowLeft } from 'lucide-react';
import { jwtDecode } from 'jwt-decode';
import { getPromptById, toggleStarPrompt } from '../services/PromptService';

import {useDarkMode} from '../Components/CommonUI/DarkModeContext'


export default function PromptDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();
  const [prompt, setPrompt] = useState(null);
  const [error, setError] = useState('');
  const [basicPromptInput, setBasicPromptInput] = useState('');
  const [userId, setUserId] = useState(null);
  const token = localStorage.getItem('token');

  // Decode userId from token
  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserId(decoded.id || decoded._id);
      } catch (err) {
        console.error('Token decode failed:', err);
      }
    }
  }, [token]);

  // Fetch prompt by ID
  useEffect(() => {
    const fetchPrompt = async () => {
      try {
        const res = await getPromptById(id);
        setPrompt(res.data);
        console.log(res.data)
      } catch (err) {
        setError('Prompt not found');
        console.error(err);
      }
    };
    fetchPrompt();
  }, [id]);

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 text-red-500 dark:text-red-400">
        <p className="text-xl">{error}</p>
        <Button onClick={() => navigate(-1)} className="mt-4">Go Back</Button>
      </div>
    );
  }

  if (!prompt) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground dark:text-gray-400 text-lg">
        Loading...
      </div>
    );
  }

  const isStarred = prompt.stars?.includes(userId);

  const handleToggleStar = async () => {
    try {
      if (!token || !userId) {
        alert("You must be logged in to star prompts.");
        return;
      }

      await  toggleStarPrompt(id)

      const updatedStars = isStarred
        ? prompt.stars.filter((id) => id !== userId)
        : [...(prompt.stars || []), userId];

      setPrompt((prev) => ({
        ...prev,
        stars: updatedStars,
      }));
    } catch (err) {
      console.error("Error toggling star:", err);
    }
  };

  return (
    <div className={`min-h-screen px-4 md:px-6 py-8 pt-24 transition-colors duration-300 ${darkMode ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-900'}`}>
      <div className="max-w-5xl mx-auto w-full">
        <Link to="/" className="text-purple-600 dark:text-purple-400 flex items-center mb-6 hover:underline">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to prompts
        </Link>

        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{prompt.title}</h1>
          <div className="flex flex-col md:flex-row md:justify-between text-sm text-muted-foreground dark:text-gray-400 gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span>By <strong>{prompt.author?.name || 'Unknown'}</strong></span>
              <span>• {new Date(prompt.createdAt).toLocaleDateString()}</span>
            </div>

            <div className="flex gap-2 flex-wrap">
              {token  && (
                <>
                  <Button variant="ghost" size="sm">Edit</Button>
                  <Button variant="ghost" size="sm">Delete</Button>
                </>
              )}
              <Button variant="ghost" size="sm">
                <Share2 className="w-4 h-4 mr-1" /> Share
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(`/forkPrompt/${prompt._id}`)}
              >
                <Layers className="w-4 h-4 mr-1" /> Fork this prompt
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleToggleStar}
                className={isStarred ? 'text-yellow-500' : ''}
              >
                <Star className="w-4 h-4 mr-1" />
                {prompt.stars?.length || 0}
              </Button>
            </div>
          </div>
        </div>

        <Card className="mb-6 bg-zinc-50 dark:bg-zinc-800 border border-border">
          <CardContent className="py-6 px-4 md:px-6 space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-purple-600 dark:text-purple-300 mb-1">About this prompt</h2>
              <p className="text-gray-700 dark:text-gray-300">{prompt.description}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase text-muted dark:text-gray-400 mb-1">System Prompt</h3>
              <pre className="bg-zinc-100 dark:bg-zinc-900 text-sm p-4 rounded-md overflow-x-auto border border-zinc-700 whitespace-pre-wrap text-gray-800 dark:text-gray-200">
                {prompt.systemPrompt}
              </pre>
            </div>
          </CardContent>
        </Card>

        <div className="mb-10">
          <h2 className="text-lg font-semibold text-purple-600 dark:text-purple-300 mb-2">Customize this prompt</h2>
          <input
            type="text"
            placeholder="Enter Basic Prompt"
            className="w-full p-3 bg-zinc-100 dark:bg-zinc-800 rounded-md text-black dark:text-white border border-zinc-300 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={basicPromptInput}
            onChange={(e) => setBasicPromptInput(e.target.value)}
          />
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Button variant="secondary">Use in ChatGPT</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
