import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../api/promptAxios';
import { Button } from '../Components/CommonUI/button';
import { Card, CardContent } from '../Components/CommonUI/card';
import { Copy, Share2, Sparkle, Star, Layers, ArrowLeft } from 'lucide-react';

export default function PromptDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState(null);
  const [error, setError] = useState('');
  const [basicPromptInput, setBasicPromptInput] = useState('');

  useEffect(() => {
    const fetchPrompt = async () => {
      try {
        const res = await api.get(`/prompts/${id}`);
        setPrompt(res.data);
      } catch (err) {
        setError('Prompt not found', err);
      }
    };
    fetchPrompt();
  }, [id]);

  if (error) {
    return (
      <div className="text-center mt-20 text-red-500">
        <p>{error}</p>
        <Button onClick={() => navigate(-1)} className="mt-4">Go Back</Button>
      </div>
    );
  }

  if (!prompt) {
    return <div className="text-center mt-20 text-muted-foreground">Loading...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 text-white">
      <Link to="/prompts" className="text-purple-400 flex items-center mb-4 hover:underline">
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to prompts
      </Link>

      <div className="mb-6">
        <h1 className="text-3xl font-bold">{prompt.title}</h1>
        <div className="flex items-center justify-between mt-2 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <span>By <strong>{prompt.author?.name || 'Unknown'}</strong></span>
            <span>• {new Date(prompt.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm"><Share2 className="w-4 h-4 mr-1" />Share</Button>
            <Button variant="ghost" size="sm"><Layers className="w-4 h-4 mr-1" />Fork</Button>
            <Button variant="ghost" size="sm"><Star className="w-4 h-4 mr-1" />{prompt.stars}</Button>
          </div>
        </div>
      </div>

      <Card className="mb-6 bg-muted border border-border">
        <CardContent className="py-4 px-6 space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-purple-300">About this prompt</h2>
            <p className="text-muted-foreground">{prompt.description}</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase text-muted">System Prompt</h3>
            <pre className="bg-zinc-900 text-sm p-4 rounded-md overflow-x-auto border border-border whitespace-pre-wrap">
              {prompt.systemPrompt}
            </pre>
          </div>
        </CardContent>
      </Card>

      <div className="mb-6">
        <h2 className="text-lg font-semibold text-purple-300">Customize this prompt</h2>
        <input
          type="text"
          placeholder="Enter Basic Prompt"
          className="w-full mt-2 p-3 bg-zinc-800 rounded-md text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={basicPromptInput}
          onChange={(e) => setBasicPromptInput(e.target.value)}
        />
        <div className="flex gap-4 mt-4">
          {/* <Button variant="default">Use in Playground</Button> */}
          <Button variant="secondary">Use in ChatGPT</Button>
          <Button variant="outline">Use in PromptLayer</Button>
        </div>
      </div>
    </div>
  );
}
