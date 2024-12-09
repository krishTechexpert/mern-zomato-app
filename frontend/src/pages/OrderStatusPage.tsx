import { useGetMyOrders } from '@/api/OrderApi'
import OrderStatusDetail from '@/components/OrderStatusDetail';
import OrderStatusHeader from '@/components/OrderStatusHeader';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Order } from '@/types';
import React from 'react'

export default function OrderStatusPage() {
  const{orders,isLoading} = useGetMyOrders();
  if(isLoading){
    return "Loading..."
  }
  if(!orders || orders.length === 0){
    return "No Orders found"
  }
  return (
    <div className='space-y-10'>
      {orders.map((order:Order) => (
        <div key={order._id} className='space-y-10 bg-gray-50 p-10 rounded-lg'>
          <OrderStatusHeader order={order} />
          <div className='grid gap-10 md:grid-cols-2'>
            <OrderStatusDetail order={order}/>
            <AspectRatio ratio={16/5}>
            <img src={order.restaurant.imageFile} className='rounded-md object-cover w-full h-full' />
            </AspectRatio>
          </div>
        </div>
      ))}
    </div>
  )
}
