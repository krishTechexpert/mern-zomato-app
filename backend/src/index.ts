import express , {Request,Response}from 'express';
import cors from 'cors';
const dotenv= require('dotenv');
dotenv.config()
const connectToDataBase = require('../db/database')


const app = express();
app.use(express.json());
app.use(cors());


app.get('/test',async(req:Request,res:Response) => {
  res.json({message:'hello krish'})
})
connectToDataBase();

app.listen(3000,() => {
  console.log("server started on localhost:3000")
})


