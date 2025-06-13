import { useEffect, useState } from "react";

import SearchBar from "../Components/Searchbar";
import FilterBar from "../Components/FilterBar";
import PromptGrid from "../Features/Prompts/PromptGrid";
import LoadingSpinner from "../Components/LoadingSpinner";

export default function StarredPromptsPage() {
  const [starredPrompts, setStarredPrompts] = useState([]);
  const [filteredPrompts, setFilteredPrompts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
   const [selectedOption, setSelectedOption] = useState('Highest Rated');
  const [selectedCategory, setSelectedCategory] = useState('All Prompts');
  // const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch starred prompts
  useEffect(() => {
    console.log("hello")
    const fetchStarredPrompts = async () => {
      try {
        const res = await api.get("/starred");
        setStarredPrompts(res.data);
        setFilteredPrompts(res.data);
      } catch (err) {
        console.error("Error loading starred prompts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStarredPrompts();
  }, []);

  // Filter and search logic
  useEffect(() => {
    let results = starredPrompts;

    if (searchTerm) {
      results = results.filter((prompt) =>
        prompt.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      results = results.filter(
        (prompt) => prompt.category === selectedCategory
      );
    }

    setFilteredPrompts(results);
  }, [searchTerm, selectedCategory, starredPrompts]);

  return (
    <div className="container mx-auto px-4 py-6 pt-24">
      <h1 className="text-3xl font-semibold mb-6 ">⭐ Starred Prompts</h1>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Search starred prompts..." 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />

        <FilterBar value={selectedCategory} onChange={setSelectedCategory} />
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <PromptGrid prompts={filteredPrompts} />
      )}
    </div>
  );
}
