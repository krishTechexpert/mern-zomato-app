import { useUpdateUserProfile } from '@/api/MyUserApi';
import UserProfileForm from '@/form/user-profile-form/UserProfileForm'
import React from 'react'

export default function UserProfilePage() {
  const {isLoading,updateMyProfile} = useUpdateUserProfile();
  return (
    <UserProfileForm onSave={updateMyProfile} isLoading={isLoading}/>
  )
}
