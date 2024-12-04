import Stripe from "stripe";
import { Request,Response } from "express";
import Restaurant, { MenuItemType } from "../models/restaurant";
import { check } from "express-validator";

const STRIPE = new Stripe(process.env.STRIPE_API_KEY as string);
const FRONTEND_URL = process.env.FRONTEND_URL as string;

type CheckoutSessionRequest = {
  cartItems:{
    menuItemId:string,
    name:string,
    quantity:string
  }[];
  deliveryDetails:{
    email:string,
    name:string,
    addressLine1:string,
    city:string
  };
  restaurantId: string
}

const createCheckoutSession = async (req:Request,res:Response) => {
  try{
    const checkoutSessionRequest:CheckoutSessionRequest = req.body;
    const  restaurant = await Restaurant.findById(checkoutSessionRequest.restaurantId);
    if(!restaurant){
      throw new Error("Restaurant Not Found")
    }

    // for stripe page show this information
    const lineItems = createLineItems(checkoutSessionRequest,restaurant.menuItems);


  }catch(error:any){
    console.log(error)
    res.status(500).json({message:error.raw.message})
  }
}

// menuItems:we can calculate price on based on menuItemId
const createLineItems = (checkoutSessionRequest:CheckoutSessionRequest,menuItems:MenuItemType[]) => {
  //1. for each cartItem,get the menuItem object from the restaurant
  // (to get the price)
  //2. for each cartitem, convert it to a stripe line item
  //3.return line item array

  const lineItems = checkoutSessionRequest.cartItems.map((cartItem) => {
      const menuItem = menuItems.find(item => item._id.toString() === cartItem.menuItemId.toString())

      if(!menuItem){
        throw new Error(`Menu Item not found: ${cartItem.menuItemId}`)
      }
      // this is pre defined object in stripe we have to used these propeties for stripe
      const line_item:Stripe.Checkout.SessionCreateParams.LineItem ={
        price_data:{
          currency:"INR",
          unit_amount: menuItem.price,
          product_data:{
            name:menuItem.name
          }
        },
        quantity: parseInt(cartItem.quantity)
      }
      return line_item
  })
}

export default {
  createCheckoutSession
}