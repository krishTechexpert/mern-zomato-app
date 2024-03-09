import {  Auth0Provider} from '@auth0/auth0-react';
import React from 'react'
import { useNavigate } from "react-router-dom";

type authProps = {
  children:React.ReactNode
}

export default function Auth0ProviderWithNavigate({children}:authProps) {
  const navigate = useNavigate();
  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const redirectUri= import.meta.env.VITE_AUTH0_CALLBACK_URL;
  const audience=import.meta.env.VITE_AUTH0_AUDIENCE;
  if(!domain || !clientId || !redirectUri ){
    throw new Error('Unable to initialize auth');
  }
  const onRedirectCallback= () =>{
    navigate('/auth-callback')
  }
  return (
    <Auth0Provider domain={domain} clientId={clientId} authorizationParams={{redirect_uri:redirectUri,audience:audience}} onRedirectCallback={onRedirectCallback} useRefreshTokens={true}  
    cacheLocation="localstorage">
      {children}
    </Auth0Provider>
  )
}
