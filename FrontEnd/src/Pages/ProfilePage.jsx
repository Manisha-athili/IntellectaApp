import React, { useEffect, useState } from "react";
import axios from "axios";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [prompts, setPrompts] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get("/api/users/me");
        setUser(res.data);
        console.log(res.data)
        setPrompts(res.data.prompts || []); // populated prompts
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    };

    fetchUserData();
  }, []);

  if (!user) return <div className="text-center mt-10 text-lg">Loading...</div>;

  const totalUpvotes = prompts.reduce((acc, p) => acc + (p.stars?.length || 0), 0);
  const totalForks = prompts.reduce((acc, p) => acc + (p.forkCount || 0), 0);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-4">👤 {user.username}</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-gray-800 p-4 rounded-xl text-center">
          <p className="text-2xl font-bold">{totalUpvotes}</p>
          <p>Total Upvotes</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-xl text-center">
          <p className="text-2xl font-bold">{totalForks}</p>
          <p>Total Forks</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-xl text-center">
          <p className="text-2xl font-bold">{prompts.length}</p>
          <p>Total Prompts</p>
        </div>
      </div>

      {/* Prompts List */}
        <h2 className="text-xl font-semibold mb-2">Prompts by {user.username}</h2>

{prompts.length === 0 ? (
  <div className="bg-gray-900 rounded-lg py-10 text-center">
    <p className="text-gray-300 text-lg mb-4">This user hasn't shared any prompts yet</p>
    <a
      href="/prompt-library"
      className="inline-block px-6 py-2 border border-gray-400 rounded-full text-white hover:bg-gray-700 transition"
    >
      Return to Prompt Library
    </a>
  </div>
) : (
  <div className="grid md:grid-cols-3 gap-4">
    {prompts.map((prompt) => (
      <div key={prompt._id} className="bg-gray-900 rounded-lg p-4">
        <h3 className="font-bold text-lg">{prompt.title}</h3>
        <p className="text-sm text-gray-300 mb-2">{prompt.description}</p>
        <div className="flex justify-between text-xs text-gray-400">
          <span>⭐ {prompt.stars?.length || 0}</span>
          <span>🔁 {prompt.forkCount}</span>
          <span>🔗 {prompt.copiedCount}</span>
        </div>
        <p className="text-[10px] text-right mt-2">
          🕒 {new Date(prompt.createdAt).toLocaleDateString()}
        </p>
      </div>
    ))}
  </div>
)}

    </div>
  );
};

export default ProfilePage;
