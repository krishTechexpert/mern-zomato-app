import { Request,Response } from "express";
import Restaurant from "../models/restaurant";
import cloudinary from "cloudinary";
import mongoose from "mongoose";


const createMyRestaurant = async (req:Request,res:Response) => {
  try{
      const existingRestaurant = await Restaurant.findOne({user:req.userId});
      if(existingRestaurant){
        // 409 for duplication
        return res.status(409).json({message:'User restaurant already exists'})
      } 

    const imageUrl =  await imageUpload(req.file as Express.Multer.File)
      
      const newRestaurant =  new Restaurant(req.body);
      newRestaurant.imageFile = imageUrl;
      newRestaurant.user = new mongoose.Types.ObjectId(req.userId);
      newRestaurant.lastUpdated=new Date()
      await newRestaurant.save();

      res.status(201).send(newRestaurant)

  }catch(error){
    console.log(error)
    return res.status(500).send({message:'failed to create new Restaurent'})
  }
}

const getMyRestaurant = async (req:Request,res:Response) => {
  try{
    const existingRestaurant = await Restaurant.findOne({user:req.userId});
    if(!existingRestaurant){
      return res.status(404).send({message:'Restaurant not found, please create your first Restaurant'})
    } 

    return res.status(200).send(existingRestaurant)

}catch(error){
  console.log(error)
  return res.status(500).send({message:'Failed to fetching Restaurent'})
}
}

const updateMyRestaurant = async(req:Request,res:Response) => {
  try{
    const restaurant = await Restaurant.findOne({user:req.userId});
    if(!restaurant){
      return res.status(404).send({message:'Restaurant not found, please create your first Restaurant'})
    } 
    restaurant.restaurantName=req.body.restaurantName;
    restaurant.city=req.body.city;
    restaurant.country=req.body.country;
    restaurant.deliveryPrice=req.body.deliveryPrice;
    restaurant.estimatedDeliveryTime=req.body.estimatedDeliveryTime;
    restaurant.cuisines=req.body.cuisines;
    restaurant.menuItems=req.body.menuItems;
    restaurant.lastUpdated=new Date();
    if(req.file){
      const imageUrl=  await imageUpload(req.file as Express.Multer.File)
      restaurant.imageFile=imageUrl;
    }
    await restaurant.save();
    return res.status(200).send(restaurant)
  }catch(error){
    console.log(error)
  return res.status(500).send({message:'Failed to update Restaurent'})
  }
}

const imageUpload = async (file:Express.Multer.File) => {
      let image = file;
      const base64Image= Buffer.from(image.buffer).toString("base64");
      let dataURI = `data:${image.mimetype};base64,${base64Image}`;
      const uploadResponse = await cloudinary.v2.uploader.upload(dataURI)
      return uploadResponse.url;
}

export default {
  createMyRestaurant,
  getMyRestaurant,
  updateMyRestaurant
}