import React from 'react'

type authProps = {
  children:React.ReactNode
}

export default function Auth0ProviderWithNavigate({}:authProps) {
  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  return (
    <div>Auth0ProviderWithNavigate</div>
  )
}
