  import Stripe from "stripe";
  import { Request,Response } from "express";
  import Restaurant, { MenuItemType } from "../models/restaurant";
  import { check } from "express-validator";
  import Order from "../models/order";

  const STRIPE = new Stripe(process.env.STRIPE_API_KEY as string);
  const FRONTEND_URL = process.env.FRONTEND_URL as string;
  const STRIPE_ENDPOINT_SECRET = process.env.STRIPE_WEBHOOK_SECRET as string;

  // Minimum amount for each menu item, otherwise ₹50 sy kam menu item per error aygi or order nhi placed hoga.. 
  const MINIMUM_AMOUNT_INR = 5000; // ₹50 in paise (smallest currency unit for INR)


  if (!STRIPE) {
    throw new Error("Stripe API key is not defined in the environment variables.");
  }

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

  const getMyOrders = async (req:Request,res:Response) => {
    try{
      const orders=await Order.find({user:req.userId}).populate("restaurant").populate("user");
      if(!orders) {
        return res.status(400).json({message:'Order not found'})
      }
      return res.json(orders)
    }catch(error){
      console.log(error);
      res.status(500).json({message:'something went wrong with order'})
    }
  }


  // to test this event open terminal and run
  // stripe trigger checkout.session.completed
  // now goto  terminal inside backend : npm run dev which run both nodemon and stripe concurrently
  // you will see event object with below console lof print also you will get STRIPE_WEBHOOK_SECRET
  const stripewebhookHandler = async (req:Request,res:Response) => {
    //sample for test
    // console.log("RECEIVED EVENT")
    // console.log('================')
    // console.log('event:',req.body)
    // res.send()
    let event;
    try{
      const sig = req.headers["stripe-signature"];
      // Verify the event with the raw body and signature
      event=STRIPE.webhooks.constructEvent(req.body,sig as string,STRIPE_ENDPOINT_SECRET)
    }catch(error:any){
      console.log(error)
      return res.status(400).send(`Webhook error: ${error.message}`)
    }

    if(event.type === "checkout.session.completed") {
      const order = await Order.findById(event.data.object.metadata?.orderId);

      if(!order) {
        return res.status(400).json({message:'Order not found'})
      }
      order.totalAmount= event.data.object.amount_total;
      order.status = "paid";
      await order.save();
    }
    res.status(200).send()
  }


  const createCheckoutSession = async (req:Request,res:Response) => {
    try{
      const checkoutSessionRequest:CheckoutSessionRequest = req.body;
      const  restaurant = await Restaurant.findById(checkoutSessionRequest.restaurantId);
      if(!restaurant){
        throw new Error("Restaurant Not Found")
      }

      const newOrder = new Order({
        restaurant:restaurant,
        user:req.userId,
        status:"placed",
        deliveryDetails:checkoutSessionRequest.deliveryDetails,
        cartItems:checkoutSessionRequest.cartItems,
        createdAt:new Date()
      })
      

      // for stripe page show this information
      const lineItems =  createLineItems(checkoutSessionRequest,restaurant.menuItems);

      // sent data to stripe
      const session = await createSession(lineItems,newOrder._id.toString(),restaurant.deliveryPrice,restaurant._id.toString())

      if(!session.url){
        return res.status(500).json({message:'Error creating stripe  session'})
      }

      await newOrder.save();

      res.json({url: session.url})
      
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
        
      // Ensure the amount is in paise (smallest currency unit for INR) in stripe rule
      const unitAmountInPaise = menuItem.price * 100; 
      //such as 120 rs convert into paisa 120 * 100 = 12000 paise
    // Check if the amount is valid (in the smallest currency unit)
    if (unitAmountInPaise < MINIMUM_AMOUNT_INR) {
      throw new Error(`The minimum amount for a purchase is ₹${MINIMUM_AMOUNT_INR / 100}.`);
    }
  

        // this is pre defined object in stripe we have to used these propeties for stripe
        const line_item:Stripe.Checkout.SessionCreateParams.LineItem ={
          price_data:{
            currency:"inr",
            unit_amount: unitAmountInPaise,
            product_data:{
              name:menuItem.name
            }
          },
          quantity: parseInt(cartItem.quantity)
        }
        return line_item
    })
    return lineItems;
  }

  const createSession = async (lineItems:Stripe.Checkout.SessionCreateParams.LineItem[],orderId:string,deliveryPrice:number,restaurantId:string) => {
    const sessionData = await STRIPE.checkout.sessions.create({
      line_items:lineItems,
      shipping_options:[{
          shipping_rate_data:{
            display_name:"Delivery",
            type:"fixed_amount",
            fixed_amount:{
              amount:deliveryPrice*100,// 5000 paisa i.e 50 rs
              currency:"inr"
            }
          }
        }],
        mode:'payment',
        metadata:{
          orderId,
          restaurantId
        },
        success_url:`${FRONTEND_URL}/order-status?success=true`,
        cancel_url:`${FRONTEND_URL}/details/${restaurantId}?cancelled=true`
    })
    return sessionData;
  }

  export default {
    createCheckoutSession,
    stripewebhookHandler,
    getMyOrders
  }