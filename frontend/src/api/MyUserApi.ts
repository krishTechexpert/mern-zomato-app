import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query";

const API_BASE_URL=import.meta.env.VITE_API_BASE_URL;


type CreateUserRequest={
  auth0Id:string,
  email:string
}
// custom api hook
export const useCreateMyUser = () => {
  // call new user Api endpoints
  const {getAccessTokenSilently}=useAuth0();
    const createMyUserRequest = async (user:CreateUserRequest) => {
      const accessToken = await getAccessTokenSilently();
      const response = await fetch(`${API_BASE_URL}/api/my/user`,{
        method:'POST',
        headers:{
          Authorization:`Bearer ${accessToken}`, 
          "Content-Type":"application/json"
        },
        body:JSON.stringify(user)
      })
      if(!response.ok){
        throw new Error("failed to create user")
      }

    }
    const {mutateAsync:createUser,isLoading,isError,isSuccess}=useMutation(createMyUserRequest);
    return {
      isError,isLoading,isSuccess,createUser
    }
}

type updateUserProfileProps = {
  name:string,
  addressLine1:string,
  city:string,
  country:string
}

// update user profile
export const useUpdateUserProfile = () => {
  const {getAccessTokenSilently}=useAuth0();
  const updateMyUserRequest = async(formData:updateUserProfileProps) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/user`,{
      method:'PUT',
      headers:{
        Authorization:`Bearer ${accessToken}`, 
        "Content-Type":"application/json"
      },
      body:JSON.stringify(formData)
    })
    if(!response.ok){
      throw new Error("failed to update user")
    }
  } 
  const {mutateAsync:updateMyProfile,isLoading,isError,isSuccess,reset} = useMutation(updateMyUserRequest);
  return {
    isLoading,updateMyProfile
  }
}