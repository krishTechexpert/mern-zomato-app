import { Order } from '@/types'
import React from 'react'
import { Card, CardHeader, CardTitle } from './ui/card'

type Props = {
  order:Order
}

export default function OrderItemCard({order}:Props) {
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
        <CardTitle className='grid md-grid-cols-4 gap-4 justify-between mb-3'>
          <div>Customer Name: <span className='ml-2 font-normal'>{order.deliveryDetails.name}</span></div>
          <div>Delivery Address: <span className='ml-2 font-normal'>{order.deliveryDetails.addressLine1}{order.deliveryDetails.city}</span></div>
          <div>Time: <span className='ml-2 font-normal'>{getTime()}</span></div>
          <div>Total Cost:<span className='ml-2 font-normal'>₹{(+order.totalAmount/100).toFixed(2)}</span></div>
        </CardTitle>
      </CardHeader>
    </Card>
  )
}
