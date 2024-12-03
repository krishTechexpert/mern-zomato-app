import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'
import { useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import LoadingButton from './LoadingButton';
import { Dialog, DialogTrigger,DialogContent } from './ui/dialog';
import { useGetMyUser } from '@/api/MyUserApi';
import UserProfileForm, { UserFormData } from '@/form/user-profile-form/UserProfileForm';

type Props = {
  onCheckout:(userFormData:UserFormData) => void;
  disabled:boolean;
}


export default function CheckoutButton({onCheckout,disabled}:Props) {
  const {isAuthenticated,isLoading:isAuthLoading,loginWithRedirect} = useAuth0();
  const { pathname } = useLocation(); // Get the current route
  
  const {currentUser,isLoading: isGetUserLoading} = useGetMyUser();
  // route such as : /detail/12779875435345
  const onLogin = async() => {
      await loginWithRedirect({
          appState:{
            returnTo: pathname, // Save the current path to return to it after login
          }
      })
  }

  if(!isAuthenticated) {
    return <Button onClick={onLogin} className='bg-orange-500 flex-1'>Log into checkout</Button>
  }

  if(isAuthLoading || !currentUser) {
    return <LoadingButton/>
  }


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={disabled} className='bg-orange-500 flex-1'>Go To checkout</Button>
      </DialogTrigger>
      <DialogContent className='max-w-[425px] md:min-w-[700px] bg-gray-50'>
        <UserProfileForm  currentUser={currentUser} onSave={onCheckout} isLoading={isGetUserLoading} title='Confirm delivery details' buttonText='Continue To Payment'/>
      </DialogContent>
    </Dialog>
  )
}
