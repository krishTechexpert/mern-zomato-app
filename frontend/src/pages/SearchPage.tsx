import { useSearchRestaurant } from '@/api/RestaurantApi'
import CuisineFilters from '@/components/CuisineFilters';
import PaginationPage from '@/components/PaginationPage';
import SearchBar, { SearchForm } from '@/components/SearchBar';
import SearchResultCard from '@/components/SearchResultCard';
import SearchResultInfo from '@/components/SearchResultInfo';
import SortOptionDropdown from '@/components/SortOptionDropdown';
import { useState } from 'react';
import { useParams } from 'react-router-dom'

export type searchState = {
  searchQuery:string,
  page:number,
  selectedCuisines:string[],
  sortOption:string
}

export default function SearchPage() {
 // city search kerny k baad agar cuisine[like burger,pizza,pasta] search kerna ho toh searchQuery ka used ker sekty ho
  const [searchState,setSearchState]=useState<searchState>({
    searchQuery:'',
    page:1,
    selectedCuisines:[],
    sortOption:'bestMatch'
  })
  const [isExpand,setIsExpand]=useState<boolean>(false);
  const {city}=useParams()
  const {results,isLoading} = useSearchRestaurant(searchState,city);

  const setSelectedCuisine = function(selectedCuisines:string[]){
    setSearchState((prevState) => ({
      ...prevState,
      page:1,
      selectedCuisines:selectedCuisines,
    }))    
  }

  const setSortOption = (sortOption:string) => {
    setSearchState((prevState) => ({
      ...prevState,
      sortOption:sortOption
    })) 
  }

  const setPage= function(page:number){
    setSearchState((prevState) => ({
      ...prevState,
      page:page,
    }))
  }


  function handleSearchQuery(searchFormData:SearchForm){
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery:searchFormData.searchQuery,
      page:1,
      sortOption:'bestMatch'
    }))
  }

  function handleResetSearch(){
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery:'',
      page:1
    }))
  }

  if(isLoading){
    <span>loading...</span>
  }
  if(!results?.data || !city){
    return <span>No result found</span>
  }
  return (
    <div className='grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5'>
      <div id="sidebar">
        <CuisineFilters selectedCuisines={searchState.selectedCuisines} onChange={setSelectedCuisine} isExpand={isExpand} onExpandClick={() => setIsExpand( prevIsExpand => !prevIsExpand)}/>
      </div>
      <div id="main-content" className='flex flex-col gap-5'>
        <SearchBar searchQuery={searchState.searchQuery} onSubmit={handleSearchQuery} placeholder='search by cuisine or restaurant name' onReset={handleResetSearch}/>
        <div className='flex justify-between flex-col gap-3 lg:flex-row'>
          <SearchResultInfo total={results.pagination.total} city={city} />
          <SortOptionDropdown sortOption={searchState.sortOption} onChange={setSortOption} />
        </div>
        {results.data.map((restaurant) => (
          <SearchResultCard key={restaurant._id} restaurant={restaurant} />
        ))}
        <PaginationPage page={+results.pagination.currentPage} pages={results.pagination.pages} onPageChange={setPage} />
      </div>
    </div>
  )
}
