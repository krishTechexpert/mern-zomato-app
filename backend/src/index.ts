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
app.use(express.json());
app.use(cors({
  origin: '*',
}));


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




