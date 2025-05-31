
import { useEffect, useState, lazy, Suspense } from 'react';
import Navbar from './Components/NavBar';
import SearchBar from './Components/Searchbar';
import FilterBar from './Components/FilterBar';
import {getAllPrompts} from '../services/PromptService'

const HeroSection = lazy(()=>import('./components/HeroSection')) 
const PromptGrid = lazy(()=>import('../src/Features/Prompts/PromptGrid'))
const LoadingSpinner = lazy(()=>import('./Components/LoadingSpinner'))


export default function App() {
  const [prompts, setPrompts] = useState([])
  const [searchTerm,setSearchTerm] = useState('')
  const [selectedOption,setSelectedOption] =useState('Highest Rated')
  const [selectedCategory, setSelectedCategory] = useState('All Prompts');
  const [loading,setLoading] = useState(true)


  useEffect(() => {
    const fetchPrompts = async(queryParams = {})=>{
      setLoading(true);
      try{
      // console.log(searchTerm);
      // console.log(selectedCategory,selectedOption)
        let res;
        const queryParams = {};
        if(searchTerm || selectedCategory || selectedOption){

          if(searchTerm) queryParams.searchWord = searchTerm 

          if(selectedCategory) queryParams.category= selectedCategory;

          if(selectedOption) queryParams.sort = selectedOption;
          console.log(queryParams)
          res = await getAllPrompts(queryParams)
          console.log(res);
          setPrompts(res)
        }else{
          res = await getAllPrompts();
        }
        console.log(res);
        setPrompts(res.data)
        console.log(prompts)
      }catch(error){
        console.log('error in fetching prompts', error)
      }
      finally{
        setLoading(false)
      }
    };
    
    fetchPrompts()
  }, [searchTerm, selectedCategory, selectedOption]);


  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      <Suspense fallback={<div className='text-center py-20'>Loading hero...</div>}>
         <HeroSection />
      </Suspense>
     
      <SearchBar 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />
      <FilterBar 
      setSelectedCategory = {setSelectedCategory}
      selectedCategory = {selectedCategory}
      />

      <Suspense fallback = {<div className="text-center py-20">Loading prompts...</div>}>
      { loading? <LoadingSpinner />:  <PromptGrid prompts={prompts}  />
      }
      </Suspense>
  
    </div>
  );
}