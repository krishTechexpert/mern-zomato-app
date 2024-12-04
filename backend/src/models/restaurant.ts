import mongoose, { InferSchemaType } from "mongoose";

const menuItemSchema = new mongoose.Schema({
  _id:{type:mongoose.Schema.Types.ObjectId, required:true,
    default:() => new mongoose.Types.ObjectId() // create default Id
  },
//  The default value is a function () => new mongoose.Types.ObjectId() which generates a new unique ObjectId whenever a document is created and no _id is provided.

//const newItem = new Item({ name: 'Sample Item' });
//console.log(newItem);
/*
Output:
{
  _id: new ObjectId("648ff3a4c3f1df0011a2b8c4"), // Automatically generated
  name: 'Sample Item'
}
*/

/* Other example

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  role: { type: String, default: 'user' } // Default role is 'user'
});

const User = mongoose.model('User', userSchema);

const newUser = new User({ username: 'john_doe' });
console.log(newUser);
/*
Output:
{
  username: 'john_doe',
  role: 'user' // Automatically assigned
}
*/
  name:{type:String,required:true},
  price:{type:Number,required:true}
})
//InferSchemaType is a TypeScript utility that automatically generates a TypeScript type based on the schema.
//This saves you from manually defining the TypeScript type and ensures consistency between the schema and the type.

export type MenuItemType= InferSchemaType<typeof menuItemSchema>

//Without InferSchemaType
//If you don't use InferSchemaType, you’d have to manually create a TypeScript type like this:
// type MenuItemType = {
//   _id: mongoose.Types.ObjectId;
//   name: string;
//   price: number;
//   available?: boolean;
// };

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