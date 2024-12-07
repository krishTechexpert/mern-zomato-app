import express , {Request,Response}from 'express';
const dotenv= require('dotenv').config()
import cors from 'cors';
import myUserRoute from "./routes/MyUserRoute"; 
import {v2 as cloudinary } from "cloudinary";
import MyRestaurantRoute from './routes/MyRestaurantRoute';
import RestaurantRoute from "./routes/RestaurantRoute";
import OrderRoute from "./routes/OrderRoute"
const connectToDataBase = require('../db/database')

const corsOpts = {
  origin: '*',
    methods: [
    'GET',
    'POST',
    'PUT',
    'DELETE'
  ],

  allowedHeaders: [
    'Content-Type',
  ],
};
const app = express();
app.use(cors({
  origin: '*',
}));

//express.raw() ensures the request body is unmodified for signature verification.
//It’s specific to webhooks (like Stripe) where the raw payload is required.

//Stripe includes a signature header (Stripe-Signature) with its webhook requests.
//To verify this signature, the raw body of the request is required

//express.raw() tells Express to parse the request body as raw binary data (a Buffer) instead of converting it to a JavaScript object.

//The { type: "*/*" } option allows this middleware to handle all content types (application/json, application/x-www-form-urlencoded, etc.).


app.use("/api/order/checkout/webhook",express.raw({type:"*/*"}))

app.use(express.json()); // put after webhook middleware


app.use("/api/my/user",myUserRoute)
app.use("/api/my/restaurant",MyRestaurantRoute)
app.use("/api/restaurant",RestaurantRoute)
app.use("/api/order",OrderRoute)

// test backend api
app.get('/test',(req:Request,res:Response) => {
res.send({message:'backend api end points tested on port such as http://localhost:3000/test on local as well as https://mern-zomato-app-backend-api.onrender.com/test'})
})

connectToDataBase();

cloudinary.config({
  cloud_name:process.env.CLOUDINARY_CLOUD_NAME, // yhi key used kerni hai sucah as cloud_name
  api_key:process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRET
})


app.listen(3000,() => {
  console.log("server started on localhost:3000")
})




