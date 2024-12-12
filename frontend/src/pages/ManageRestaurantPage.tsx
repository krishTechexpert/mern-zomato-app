import { useCreateMyRestaurant, useUpdateMyRestaurant, usegetMyRestaurant, usegetMyRestaurantOrder } from '@/api/MyRestaurantApi';
import OrderItemCard from '@/components/OrderItemCard';
import OrderStatusDetail from '@/components/OrderStatusDetail';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ManageRestaurantForm from '@/form/manage-restaurant-form/ManageRestaurantForm'
import React from 'react';

export default function ManageRestaurantPage() {
  const {restaurant}=usegetMyRestaurant();
  const {isLoading:isCreating,createRestaurant} = useCreateMyRestaurant();
  const {isLoading:isUpdating,updateRestaurant}=useUpdateMyRestaurant();

  const {orders} = usegetMyRestaurantOrder();

  const isEditing = !!restaurant; // give true if restaurant exits otherwise undefined(falsy)

  return (
    <Tabs defaultValue="orders">
  <TabsList>
    <TabsTrigger value="orders">Orders</TabsTrigger>
    <TabsTrigger value="manage-restaurant">Manage Restaurant</TabsTrigger>
  </TabsList>
  <TabsContent value="orders" className='space-y-5 bg-gray-50 pg-10 rounded-lg'>
    <h2 className='text-2xl font-bold'>{orders?.length} active orders</h2>
    {orders && orders.map((order,index) => (
      <OrderItemCard key={index} order={order}/>
    ))}
  </TabsContent>
  <TabsContent value="manage-restaurant">
    <ManageRestaurantForm restaurant={restaurant} onSave={isEditing ? updateRestaurant: createRestaurant} isLoading={isCreating ||isUpdating} />
  </TabsContent>
</Tabs>

  )
}
