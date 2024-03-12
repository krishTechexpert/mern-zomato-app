import express from "express";
import multer from "multer";
import MyRestaurantController from "../controllers/MyRestaurantController";
const router=express.Router();


const storage = multer.memoryStorage()
const upload = multer({ 
  storage: storage,
  limits:{
    fileSize: 5 * 1024 * 1024 // 5mb
  }
 })

// req.file is the `imageFile` file

// /api/my/restaurant

router.post('/',upload.single('imageUrl'),MyRestaurantController.createMyRestaurant)

export default router;