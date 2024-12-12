import { Order, Restaurant } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL=import.meta.env.VITE_API_BASE_URL;

// react custom hook banaya hai here
export const useCreateMyRestaurant = () => {
  const {getAccessTokenSilently} = useAuth0();

  // here this method return promise of Restaurantprops that's why we define types of promise
  const createMyRestaurantRequest = async(restaurantFormData:FormData):Promise<Restaurant> => {
      
    const accessToken = await getAccessTokenSilently();
      
      const response = await fetch(`${API_BASE_URL}/api/my/restaurant`,{
            method:'POST',
            headers:{
              Authorization:`Bearer ${accessToken}`
            },
            body:restaurantFormData
      })
      const result = await response.json();
      // show error
      if(result.message){
        throw new Error(result.message)
      }
      return result;


  }

  // react query fetching
  const {mutate:createRestaurant,isLoading,error,isSuccess}=useMutation(createMyRestaurantRequest);
  
  if(error){
    toast.error(error.toString())
  }

  if(isSuccess){
    toast.success('Restaurant created successfully')
  }
  
    return {
      isLoading,createRestaurant
    }

}

export const usegetMyRestaurant = () => {
  const {getAccessTokenSilently} = useAuth0();

  const getMyRestaurantRequest = async():Promise<Restaurant> => {
      
    const accessToken = await getAccessTokenSilently();
      
      const response = await fetch(`${API_BASE_URL}/api/my/restaurant`,{
            method:'GET',
            headers:{
              Authorization:`Bearer ${accessToken}`
            }
      })
      const result = await response.json();
      // show error
      if(result.message){
        throw new Error(result.message)
      }
      return result;


  }

  // react query (useQuery) for fetching
  const {data:restaurant,isLoading,error}=useQuery("fetchMyRestaurant",getMyRestaurantRequest);
  
  if(error){
    toast.error(error.toString())
  }

    return {
      isLoading,restaurant
    }

}

export const useUpdateMyRestaurant = () => {
  const {getAccessTokenSilently} = useAuth0();

  const updateRestaurantRequest = async(restaurantFormData:FormData):Promise<Restaurant> => {

    const accessToken = await getAccessTokenSilently();
      
      const response = await fetch(`${API_BASE_URL}/api/my/restaurant`,{
            method:'PUT',
            headers:{
              Authorization:`Bearer ${accessToken}`
            },
            body:restaurantFormData
      })
      if(!response){
        throw new Error('Failed to update Restaurant')
      }
      const result = await response.json();
      // show error
      if(result.message){
        throw new Error(result.message)
      }
      return result;

  }

  const {mutate:updateRestaurant,isLoading,error,isSuccess}=useMutation(updateRestaurantRequest);
  
  if(error){
    toast.error(error.toString())
  }

  if(isSuccess){
    toast.success('Restaurant updated successfully')
  }
  
    return {
      isLoading,updateRestaurant
    }
}

export const usegetMyRestaurantOrder = () => {
  const {getAccessTokenSilently}=useAuth0();
  const getMyRestaurantOrderRequest = async ():Promise<Order[]> => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/restaurant/order`,{
      headers:{
        Authorization:`Bearer ${accessToken}`,
        "Content-Type": "application/json"
      }
    })
    if(!response.ok){
      throw new Error("Failed to fetch orders")
    }
    return response.json()
  }
  const {data:orders,isLoading} = useQuery("fetchMyRestaurantOrders",getMyRestaurantOrderRequest);

  return {
    orders,
    isLoading
  }
}