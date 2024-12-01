import { useGetRestaurant } from '@/api/RestaurantApi';
import RestaurantInfo from '@/components/RestaurantInfo';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import React from 'react'
import { useParams } from 'react-router-dom'

export default function DetailPage() {
  const {restaurantId}=useParams();
  const {restaurant,isLoading}=useGetRestaurant(restaurantId);

  if(isLoading) return "Loading...";
  if(!restaurant) return <div>No Restaurant Found</div>
  console.log(restaurant)
  return (
    <div className='flex flex-col gap-10'>
      <AspectRatio ratio={16 / 5}>
        <img src={restaurant.imageFile} className='rounded-md object-cover h-full w-full ' />
      </AspectRatio>
      <div className='grid md:grid-cols-[4fr_2fr] gap-5 md:px-32'>
          <div className='flex flex-col gap-4'>
              <RestaurantInfo restaurant={restaurant} />
          </div>
      </div>  
    </div>
  )
}
