import { useCreateCheckoutSession } from '@/api/OrderApi';
import { useGetRestaurant } from '@/api/RestaurantApi';
import CheckoutButton from '@/components/CheckoutButton';
import MenuItem from '@/components/MenuItem';
import OrderSummary from '@/components/OrderSummary';
import RestaurantInfo from '@/components/RestaurantInfo';
import { Card, CardFooter } from '@/components/ui/card';
import { UserFormData } from '@/form/user-profile-form/UserProfileForm';
import { MenuItem as MenuItemType} from '@/types';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

export type CartItem = {
  _id:string,
  name:string,
  price:number,
  quantity:number
}

export default function DetailPage() {
  const {restaurantId}=useParams();
  const {restaurant,isLoading}=useGetRestaurant(restaurantId);
  const [minOrderPurchase,setMinOrderPurchase]=useState<number>(50)
  const {createCheckoutSession,isLoading:isCheckoutLoading}=useCreateCheckoutSession();

  const [cartItems,setCartItems]=useState<CartItem[]>(() => {
    const storedCartItems=sessionStorage.getItem(`cartItems-${restaurantId}`);
    return storedCartItems ? JSON.parse(storedCartItems) : []
  })

  const addToCart = (menuItem: MenuItemType) => {

    setCartItems((prevCartItems) => {
      //1. check if item is already in cart
      const existingCartItem = prevCartItems.find(cartItem => cartItem._id === menuItem._id)
      let updateCartItems;
      if(existingCartItem){
              //2 .if item is in cart then update quantity

          updateCartItems = prevCartItems.map((cartItem) => cartItem._id === menuItem._id ? {...cartItem,quantity: cartItem.quantity + 1} : cartItem )
      }else {
        //3. it item is not in cart, add it as new item
        updateCartItems = [...prevCartItems,{
          _id:menuItem._id,
          name:menuItem.name,
          price:menuItem.price,
          quantity:1
        }]
      }
      sessionStorage.setItem(`cartItems-${restaurantId}`,JSON.stringify(updateCartItems))
      return updateCartItems
    })
  }

  const removeFromCart = (cartItem:CartItem) => {
    setCartItems((prevCartItems) => {
      const updateCartItems = prevCartItems.filter(item => item._id !== cartItem._id);
      return updateCartItems;
    })

  }

  const onCheckout = async (userFormData: UserFormData) => {
    if(!restaurant) return;
      console.log("user form data",userFormData);
      const checkoutData={
        cartItems:cartItems.map((cartItem) => ({
          menuItemId:cartItem._id,
          name:cartItem.name,
          quantity:cartItem.quantity.toString()
        })),
        restaurantId:restaurant._id,
        deliveryDetails:{
          name:userFormData.name,
          addressLine1:userFormData.addressLine1,
          city:userFormData.city,
          country:userFormData.country,
          email:userFormData.email as string
        }
      }

      const data = await createCheckoutSession(checkoutData);
      window.location.href=data.url;
  }

  if(isLoading) return "Loading...";
  if(!restaurant) return <div>No Restaurant Found</div>
  return (
    <div className='flex flex-col gap-10'>
      <AspectRatio ratio={16 / 5}>
        <img src={restaurant.imageFile} className='rounded-md object-cover h-full w-full ' />
      </AspectRatio>
      <div className='grid md:grid-cols-[4fr_2fr] gap-5 md:px-32'>
          <div className='flex flex-col gap-4'>
              <RestaurantInfo restaurant={restaurant} />
              <span className='text-2xl font-bold tracking-tight'>Menu</span>
              {restaurant.menuItems.map((menuItem,index) => (
                <MenuItem key={index} menuItem={menuItem} addToCart={() => addToCart(menuItem)} />
              ))}
          </div>

          <div>
            <Card>
              <OrderSummary restaurant={restaurant} cartItems={cartItems} removeFromCart={ removeFromCart} minOrderPurchase={minOrderPurchase} setMinOrderPurchase = {setMinOrderPurchase} />
              <CardFooter>
                <CheckoutButton disabled={cartItems.length === 0 || minOrderPurchase < 50} isLoading={isCheckoutLoading} onCheckout={onCheckout} />
              </CardFooter>
              {minOrderPurchase<50 && <span className='text-red-500 text-sm'>The minimum order is required ₹50.</span>}
            </Card>
          </div>
      </div>  
    </div>
  )
}
