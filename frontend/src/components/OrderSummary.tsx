import { CartItem } from '@/pages/DetailPage'
import { Restaurant } from '@/types'
import React, { useEffect } from 'react'
import { CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Separator } from './ui/separator'
import { Trash } from 'lucide-react'

type Props = {
  restaurant: Restaurant,
  cartItems:CartItem[],
  removeFromCart:(cartItem:CartItem) => void,
  minOrderPurchase:number,
  setMinOrderPurchase:React.Dispatch<React.SetStateAction<number>>

}
export default function OrderSummary({restaurant,cartItems,removeFromCart,setMinOrderPurchase,minOrderPurchase}:Props) {
  const getTotalCost = () => {
    const totalPrice = cartItems.reduce((total,item) => total + item.price * item.quantity,0 );
    const totalWithDelivery = totalPrice && (totalPrice + restaurant.deliveryPrice)/100;
    if( minOrderPurchase < 50) {
      
      // according to stripe rule,  minimum purchase order should be >50 for india
      //alert("The minimum amount for a purchase is ₹50.");
      setMinOrderPurchase(totalWithDelivery)
    }
    setMinOrderPurchase(totalWithDelivery)
    return totalWithDelivery.toFixed(2);
  }

  useEffect(() => {
    getTotalCost();
  },[minOrderPurchase,cartItems])

  return (
    <>
      <CardHeader>
        <CardTitle className='text-2xl font-bold tracking-tight flex justify-between'>
          <span>Your Order</span>
          <span>₹{minOrderPurchase}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col gap-5'>
        {cartItems.map((item,index) => (
          <div key={index} className='flex justify-between'>
            <span>
              <Badge variant="outline" className='mr-2'>
                  {item.quantity}
              </Badge>
              {item.name}
            </span>
            <span className='flex items-center gap-1'>
              <Trash className='cursor-pointer' color="red" size={20} onClick={() =>removeFromCart(item) }/>
            ₹{((item.price * item.quantity) / 100).toFixed(2)}
            </span>
          </div>
        ))}
        <Separator />
        <div className='flex justify-between'>
            <span>Delivery</span>
            <span>₹{(restaurant.deliveryPrice/100).toFixed(2)}</span>
        </div>
      </CardContent>
    </>
  )
}
