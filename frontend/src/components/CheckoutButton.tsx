import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'
import { useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import LoadingButton from './LoadingButton';

export default function CheckoutButton() {
  const {isAuthenticated,isLoading:isAuthLoading,loginWithRedirect} = useAuth0();
  const { pathname } = useLocation(); // Get the current route
  
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

  if(isAuthLoading) {
    return <LoadingButton/>
  }


  return (
    <div>CheckoutButton</div>
  )
}
