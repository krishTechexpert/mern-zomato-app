import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import { useAuth0 } from '@auth0/auth0-react'

export default function MobileNavLinks() {
  const {logout} = useAuth0();
  return (
    <>
    <Link className='flex bg-white items-center font-bold hover:text-orange-500' to='/order-status'>Order Status</Link>
    <Link to="/manage-restaurant" className='font-bold text-orange-500'>My Restaurant</Link>
    <Link className='flex bg-white items-center font-bold hover:text-orange-500' to='/user-profile'>My profile</Link>

      <Button className='flex items-center px-3 font-bold hover:bg-gray-500' onClick={() => logout()}>Logout</Button>
    </>
  )
}
