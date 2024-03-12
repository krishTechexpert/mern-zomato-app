import { useGetMyUser, useUpdateUserProfile } from '@/api/MyUserApi';
import UserProfileForm from '@/form/user-profile-form/UserProfileForm'

export default function UserProfilePage() {
  const {currentUser,isLoading:isGetLoading} = useGetMyUser();
  let {isLoading:isUpdateLoading,updateMyProfile} = useUpdateUserProfile();
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
