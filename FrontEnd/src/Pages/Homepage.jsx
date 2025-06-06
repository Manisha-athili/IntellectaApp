

import { useEffect, useState, lazy, Suspense } from 'react';
import SearchBar from '../Components/Searchbar';
import FilterBar from '../Components/FilterBar';
import {getAllPrompts} from '../../services/PromptService'
;

const HeroSection = lazy(()=>import('../components/HeroSection')) 
const PromptGrid = lazy(()=>import('../Features/Prompts/PromptGrid'))
const LoadingSpinner = lazy(()=>import('../Components/LoadingSpinner'))


export default function HomePage() {
  const [prompts, setPrompts] = useState([])
  const [searchTerm,setSearchTerm] = useState('')
  const [selectedOption,setSelectedOption] =useState('Highest Rated')
  const [selectedCategory, setSelectedCategory] = useState('All Prompts');
  const [loading,setLoading] = useState(true)


  useEffect(() => {
    const fetchPrompts = async()=>{
      setLoading(true);
      const token = localStorage.getItem('token');
      try{

        let res;
        const queryParams = {};
        
        if(searchTerm) queryParams.searchWord = searchTerm 
        if(selectedCategory) queryParams.categories= selectedCategory;
        if(selectedOption) queryParams.sort = selectedOption;

        console.log("queryParams",queryParams)
        
        res = await getAllPrompts(queryParams)

        setPrompts(res.data)
       
      }catch(error){
        console.log('error in fetching prompts..', error)
      }
      finally{
        setLoading(false)
      }
    };
    
    fetchPrompts()
  }, [searchTerm, selectedCategory, selectedOption]);


  return (
    <div className="bg-black text-white min-h-screen">
      
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
      <h1>hello</h1>
    </div>
  );
}