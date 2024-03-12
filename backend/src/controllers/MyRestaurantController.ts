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

      const image = req.file as Express.Multer.File;
      const base64Image= Buffer.from(image.buffer).toString("base64");
      const dataURI = `data:${image.mimetype};base64,${base64Image}`;

      const uploadResponse = await cloudinary.v2.uploader.upload(dataURI)

      const newRestaurant =  new Restaurant(req.body);
      newRestaurant.imageUrl = uploadResponse.url;
      newRestaurant.user = new mongoose.Types.ObjectId(req.userId);
      newRestaurant.lastUpdated=new Date()
      await newRestaurant.save();

      res.status(201).send(newRestaurant)

  }catch(error){
    console.log(error)
    res.status(500).json({message:'failed to create new Restaurent'})
  }


}


export default {
  createMyRestaurant
}