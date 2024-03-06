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
