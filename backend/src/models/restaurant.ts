import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema({
  name:{type:String,required:true},
  price:{type:Number,required:true}
})


const restaurantSchema = new mongoose.Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true
  },
  restaurantName: {
    type:String,
    required:true
  },
  city:{type:String,required:true},
  country:{type:String,required:true},
  deliveryPrice:{type:Number,required:true}, // price should be in decimal format..do some RND on this
  estimatedDeliveryTime:{type:Number,required:true}, // in seconds
  cuisines:[{type:String,required:true}], // this restaurent serve international cuisine [bojan,khana]
  menuItems:[menuItemSchema],
  imageFile:{type:String,required:true},
  lastUpdated:{type:Date,required:true},
  createdAt:{type:Date,default:Date.now}
})

const Restaurant =  mongoose.model("Restaurant",restaurantSchema);
export default Restaurant;