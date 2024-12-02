import { useAuth0 } from '@auth0/auth0-react'
import { Outlet ,Navigate} from 'react-router-dom';
import React from 'react';

export default function ProtectedRoute() {
  const {isAuthenticated,isLoading} = useAuth0();
  if(isLoading) return <span>loading...</span>

  return isAuthenticated ? (<Outlet/>) : (<Navigate to="/" replace />)

}
