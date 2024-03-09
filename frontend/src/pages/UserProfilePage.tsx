import { useGetMyUser, useUpdateUserProfile } from '@/api/MyUserApi';
import UserProfileForm from '@/form/user-profile-form/UserProfileForm'
import React,{useEffect,useState} from 'react';

export default function UserProfilePage() {
  const {currentUser,isLoading:isGetLoading} = useGetMyUser();
  let {isLoading:isUpdateLoading,updateMyProfile,isSuccess} = useUpdateUserProfile();
  const [updationDone,setUpdationDone]=useState(false)
  if(isGetLoading){
    return <span>Loading...</span>
  }
  if(!currentUser){
    return <span>Unable to load user profile</span>
  }
  
  return (
    <UserProfileForm currentUser={currentUser} onSave={updateMyProfile} isLoading={isUpdateLoading} />
  )
}
