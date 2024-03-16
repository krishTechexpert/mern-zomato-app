import {body, validationResult} from "express-validator";
import {Request,Response,NextFunction} from "express";

export const handleValidationError = async (req:Request,res:Response,next:NextFunction) => {
    const errors =  validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({errors:errors.array()})
    }
    next();
};

export const validateMyUserRequest = [
  body("name").isString().notEmpty().withMessage("Name must be string"),
  body("addressLine1").isString().notEmpty().withMessage("AddressLine1 must be string"),
  body("city").isString().notEmpty().withMessage("City must be string"),
  body("country").isString().notEmpty().withMessage("Country must be string"),
  handleValidationError
]

export const validateMyRestaurantRequest = [
  body("restaurantName").notEmpty().withMessage("Restaurant name is required"),
  body("city").notEmpty().withMessage("city is required"),
  body("country").notEmpty().withMessage("country is required"),
  body("deliveryPrice").isFloat({min:0}).withMessage("Delivery Price must be positive number"),
  body("estimatedDeliveryTime").isInt({min:0}).withMessage("estimated Delivery Time must be positive integer"),
  body("cuisines").isArray().withMessage("Cuisines must be an array").not().isEmpty().withMessage("Cuisines Array can not be empty"),
  body("menuItems").isArray().withMessage("Menu Items must be an array"),
  // below line means each items in menuItems 
  body("menuItems.*.name").notEmpty().withMessage("Menu Item name is required"),
  body("menuItems.*.price").isFloat({min:0}).withMessage("Menu item price is required and must be positive number"),
  handleValidationError
]