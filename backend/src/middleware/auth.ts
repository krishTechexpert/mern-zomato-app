import { auth } from 'express-oauth2-jwt-bearer';
import {Request,Response,NextFunction} from "express";
import jwt from "jsonwebtoken";
import User from '../models/user';

// here if you want to add custom properties to  the express request
// the request part you can add whatever you want in here
declare global{
  namespace Express {
    interface Request {
      userId:string,
      auth0Id:string
    }
  }
}
export const jwtCheck = auth({
  audience: 'zomato-food-ordering-app-api',
  issuerBaseURL: 'https://dev-uu4llwa41y0tqqnj.us.auth0.com/',
  tokenSigningAlg: 'RS256'
});

export const jwtParse = async (req:Request,res:Response,next:NextFunction) => {
  const {authorization} = req.headers;
  if(!authorization || !authorization.startsWith('Bearer ')){
    return res.sendStatus(401)
  }
  const token=authorization.split(" ")[1];
  try{
    const decoded=jwt.decode(token) as jwt.JwtPayload;
    const auth0Id=decoded.sub;
    const user =  await User.findOne({auth0Id})
    if(!user){
      return res.sendStatus(401)
    }
    console.log("user parsed token",user)
    req.auth0Id=auth0Id as string;
    req.userId=user._id.toString();
    next();
  }catch(error){
    console.log(error)
    return res.sendStatus(401)
  }
}
