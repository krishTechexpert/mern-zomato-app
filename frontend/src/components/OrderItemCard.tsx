import { Order, OrderStatus } from '@/types'
import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Separator } from './ui/separator'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger } from './ui/select'
import { SelectValue } from '@radix-ui/react-select'
import { ORDER_STATUS } from '@/config/order-status-config'
import { useUpdateMyRestaurantOrder } from '@/api/MyRestaurantApi'

type Props = {
  order:Order
}

export default function OrderItemCard({order}:Props) {
  const {updateRestaurantStatus,isLoading} = useUpdateMyRestaurantOrder();
  const [status,setStatus] = useState<OrderStatus>(order.status)
  const handleStatusChange = async(newStatus:OrderStatus) => {
    updateRestaurantStatus({orderId:order._id as string,status:newStatus})
    setStatus(newStatus)
  }

  //1
  //The useEffect ensures the child component (where you show the order's status) stays updated if the parent component sends new status data for the order.

//   For example:

// Imagine the parent gets an updated status for the order (like "Delivered" → "Cancelled").
// If the child doesn’t use useEffect, it might not realize the status has changed because useState only keeps the initial value (order.status) it got when the component first loaded.
// With this useEffect, you’re telling React:

// "Hey! If the parent sends a new order.status, update my local status state to match."

//2
// What Happens Without useEffect?
// If you don’t use useEffect:

// The child component’s status value won’t change when the parent sends new order.status data.
// It will only show the status it got the very first time it loaded.
// In simpler words:

// Without useEffect, the child might show outdated (old) status.
// With useEffect, the child always shows the latest status from the parent.


//3
// Why Does It “Work” Without useEffect?
// Sometimes, you won’t notice a problem without useEffect because:

// The parent isn’t sending new data (so the status doesn’t change).
// The component reloads (re-mounts), and React updates the status anyway because useState re-runs.
// But in a real app, if the parent sends new status dynamically (like from an API or real-time update), the child will fail to update without useEffect.


  useEffect(() => {
    setStatus(order.status)
  },[order.status])

  const getTime = () => {
    const orderDateTime= new Date(order.createdAt);
    const hours = orderDateTime.getHours();
    const mintues = orderDateTime.getMinutes();

    const paddedMintues=mintues < 10 ? `0${mintues}`: mintues;
    return `${hours}:${paddedMintues}`
  }
  return (
    
    <Card>
            <CardHeader>
        <CardTitle className="grid md:grid-cols-4 gap-4 justify-between mb-3">
          <div>
            Customer Name:
            <span className="ml-2 font-normal">
              {order.deliveryDetails.name}
            </span>
          </div>
          <div>
            Delivery address:
            <span className="ml-2 font-normal">
              {order.deliveryDetails.addressLine1}, {order.deliveryDetails.city}
            </span>
          </div>
          <div>
            Time:
            <span className="ml-2 font-normal">{getTime()}</span>
          </div>
          <div>
            Total Cost:
            <span className="ml-2 font-normal">
            ₹{(+order.totalAmount/100).toFixed(2)}
            </span>
          </div>
        </CardTitle>
        <Separator />
      </CardHeader>
      
      <CardContent className='flex flex-col gap-6'>
          <div className='flex flex-col gap-2'>Cuisine:
            {order && order.cartItems.map((cartItem) => (
              <span>
                <Badge variant="outline" className='mr-2'> 
                  {cartItem.quantity}
                </Badge>
                {cartItem.name}
              </span>
              
            ))}
          </div>
          <div className='flex flex-col space-y-1.5'>
            <Label htmlFor='status'>what is the status of this order</Label>
            <Select value={status} disabled={isLoading} onValueChange={(value) => handleStatusChange(value as OrderStatus) }>
              <SelectTrigger id="status">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent position="popper">
              {ORDER_STATUS.map((status) => (<SelectItem value={status.value}>{status.label}</SelectItem>))}
              </SelectContent>
            </Select>
          </div>
      </CardContent>
    </Card>
  )
}



