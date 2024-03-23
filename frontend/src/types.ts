
// jab hum fetch api used kerty hai toh woh kuch Promise response retrun kerta hai so we defined types of response here (kis type ka response retrun aa reha hai)

export type UserProps = {
  _id:string,
  name:string,
  email:string,
  addressLine1:string,
  city:string,
  country:string
}

export type MenuItem = {
  _id:string,
  name:string,
  price:number
}

export type Restaurant={
  _id:string,
  user:string,
  restaurantName:string,
  city:string,
  country:string,
  deliveryPrice:number,
  estimatedDeliveryTime:number,
  cuisines:string[],
  menuItems:MenuItem[],
  imageFile:string,
  lastUpdated:string
}