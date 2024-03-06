import express , {Request,Response}from 'express';
import cors from 'cors';
import myUserRoute from "./routes/MyUserRoute"; 
const dotenv= require('dotenv');
dotenv.config()
const connectToDataBase = require('../db/database')

const corsOpts = {
  origin: '*',

  methods: [
    'GET',
    'POST',
  ],

  allowedHeaders: [
    'Content-Type',
  ],
};
const app = express();
app.use(express.json());
app.use(cors());


app.use("/api/my/user",myUserRoute)

connectToDataBase();
app.listen(3000,() => {
  console.log("server started on localhost:3000")
})




