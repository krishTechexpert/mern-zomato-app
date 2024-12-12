import { MenuItem as MenuItemValue } from '../types'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

type Props = {
  menuItem:MenuItemValue,
  addToCart:() => void
}

export default function MenuItem({menuItem,addToCart}:Props) {
  return (
    <Card className='cursor-pointer' onClick={addToCart}>
      <CardHeader>
        <CardTitle>{menuItem.name}</CardTitle>
      </CardHeader>
      <CardContent className='font-bold-100'>
      ₹{(menuItem.price).toFixed(2)}
      </CardContent>
    </Card>
  )
}
