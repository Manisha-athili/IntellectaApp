
import Navbar from './Components/NavBar';
import HeroSection from './components/HeroSection';
import PromptGrid from './Features/Prompts/PromptGrid';
import SearchBar from './Components/Searchbar';
import FilterBar from './Components/FilterBar';

export default function App() {
  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      <HeroSection />
      <SearchBar />
      <FilterBar/>
      <PromptGrid />
    </div>
  );
}