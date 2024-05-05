import { RestaurantSearchResponse } from "@/types";
import { useQuery } from "react-query";
import {searchState} from "../pages/SearchPage";
const API_BASE_URL=import.meta.env.VITE_API_BASE_URL;

export const useSearchRestaurant = (searchState:searchState,city?:string) => {
  const params = new URLSearchParams();
  params.set("searchQuery",searchState.searchQuery);
  params.set("page",searchState.page.toString());
  params.set("selectedCuisines",searchState.selectedCuisines.join(','));
  params.set("sortOption",searchState.sortOption.toString());

  const createSearchRequest = async ():Promise<RestaurantSearchResponse> => {
  const response = await fetch(`${API_BASE_URL}/api/restaurant/search/${city}?${params.toString()}`)
    if(!response.ok){
      throw new Error('Failed to get restaurant')
    }
    return response.json()
  }
  // searchState ki value jab bi change hogi then useQuery will run request for us and get new result back 
  const {data:results,isLoading}=useQuery(["searchRestaurants",searchState],createSearchRequest,{enabled:!!city}) // if there is city value then only run query
  return {
    results,isLoading
  }
}