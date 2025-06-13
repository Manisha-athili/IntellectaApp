import { useEffect, useState } from "react";

import SearchBar from "../Components/Searchbar";
import FilterBar from "../Components/FilterBar";
import PromptGrid from "../Features/Prompts/PromptGrid";
import LoadingSpinner from "../Components/LoadingSpinner";
import { getStarredPrompts } from "../services/PromptService";

export default function StarredPromptsPage() {
  const [starredPrompts, setStarredPrompts] = useState([]);
  const [filteredPrompts, setFilteredPrompts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState("Highest Rated");
  const [selectedCategory, setSelectedCategory] = useState("All Prompts");
  const [loading, setLoading] = useState(true);

  // Fetch starred prompts from service
  useEffect(() => {
    const fetchStarredPrompts = async () => {
      try {
        const res = await getStarredPrompts();
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

  // Filtering and sorting logic
  useEffect(() => {
    let results = [...starredPrompts];

    // Search filter
    if (searchTerm) {
      results = results.filter((prompt) =>
        prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prompt.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prompt.systemPrompt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (prompt.categories || []).some((cat) =>
          cat.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Category filter
    if (selectedCategory && selectedCategory !== "All Prompts") {
      results = results.filter((prompt) =>
        prompt.categories?.includes(selectedCategory)
      );
    }

    // Sorting
    switch (selectedOption) {
      case "Newest":
        results.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        break;
      case "Highest Rated":
        results.sort((a, b) => (b.stars?.length || 0) - (a.stars?.length || 0));
        break;
      case "Most Forked":
        results.sort((a, b) => (b.forkCount || 0) - (a.forkCount || 0));
        break;
      case "Most Used":
        results.sort((a, b) => (b.copiedCount || 0) - (a.copiedCount || 0));
        break;
      default:
        break;
    }

    setFilteredPrompts(results);
  }, [searchTerm, selectedCategory, selectedOption, starredPrompts]);

  return (
    <div className="container mx-auto px-4 py-6 pt-24">
      <h1 className="text-3xl font-semibold mb-6">⭐ Starred Prompts</h1>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
        <FilterBar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : filteredPrompts.length > 0 ? (
        <PromptGrid prompts={filteredPrompts} />
      ) : (
        <p className="text-center text-gray-500 text-lg mt-10">
          No starred prompts found.
        </p>
      )}
    </div>
  );
}
