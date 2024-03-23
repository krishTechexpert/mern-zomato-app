import { Restaurant } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query";
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