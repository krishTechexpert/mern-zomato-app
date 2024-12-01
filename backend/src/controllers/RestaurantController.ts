import { Request,Response } from "express";
import Restaurant from "../models/restaurant";

// we used here backend logic for searching and filters, sorting etc
const serchRestaurants = async(req:Request,res:Response) => {
  try{
    const city =req.params.city;
    //some extra option such as filter and sort etc below
    const searchQuery= (req.query.searchQuery as string) || '';
    const selectedCuisines = (req.query.selectedCuisines as string ) || ''; 
    //selectedCuisines = [pizza,burger,pasta]-> pizza,burger,pasta
    const sortOptions = (req.query.sortOption as string) || 'lastUpdated'; // otherwise it will sort as per lastUpdate modal key

    let currentPage:any=(req.query.page as string) || 1;


    let query:any={};

    query["city"]=new RegExp(city,"i");

    const cityCheck = await Restaurant.countDocuments(query)
    if(cityCheck ===0){
       return res.status(404).json({
        data:[],
        pagination:{
          total:0,
          currentPage:1,
          pages:1
        }
       })
    }

    if(selectedCuisines){
      // URl = selectedCuisines=pizza,burger,pasta
    const cuisineArray = selectedCuisines.split(",").map((cuisine) => new RegExp(cuisine,"i"));
      query["cuisines"]= {$all:cuisineArray} // Use $all when all patterns must match.
      //{ cuisines: { $all: [/pizza/i, /burger/i, /pasta/i] } }
    }

    if(searchQuery){
      // restaurantName = burger place 
      // cuisines = [pasta,Burger,Pizza]
      // searchQuery = Pasta
      const searchItem =  new RegExp(searchQuery,"i");
      query["$or"]=[
        {restaurantName: searchItem},
        {cuisines: {$in: [searchItem]} }
      ]
    }
    
    const pageSize=10;
    const skip = (currentPage - 1 ) * pageSize; // (3-1) * 10 = 20 [ skip first 2 page]

    // here now query contain city,selectedCuisine,searchQuery

    // sortOptions = "lastUpdate" here we used array as ["lastUpdate"] key then sort as per lastUdate key and 1 here ascending order checkout mongodb sort method
    
    const restaurants = await Restaurant.find(query)
      .sort({[sortOptions]:1})
      .skip(skip)
      .limit(pageSize)
      .lean() // lean() method This makes queries faster and less memory intensive, but the result documents are plain old JavaScript objects (POJOs)

      const total = await Restaurant.countDocuments(query); // total result documents
      const response = {
        data:restaurants,
        pagination:{
          total,
          currentPage,
          pages: Math.ceil(total/pageSize) // 50 results, pageSize: 10 , pages:5
        }
      }
      return res.status(200).json(response)
  }catch(error){
    console.log(error)
    return res.status(500).json({message:'Something went to wrong for search'})
  }
}

const getRestaurant = async(req:Request,res:Response) => {
  try{
    const {restaurantId} = req.params;
    const restaurant = await Restaurant.findById(restaurantId);
    if(!restaurant){
      return res.status(404).json({message:'Restaurant not found'})
    }
     res.status(200).json(restaurant)

  }catch(error){
    console.log(error);
    return res.status(500).json({message:'Something went to wrong for restaurant details'})
  }
}

export  default{
  serchRestaurants,
  getRestaurant
}