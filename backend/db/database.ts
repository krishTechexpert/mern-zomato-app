const mongoose = require('mongoose');

function connectToDataBase(){
       mongoose.set('strictQuery', true);
       //I am certain that process.env.DB_URI is a string and not undefined."
       mongoose.connect(process.env.DB_URI as string).then((data:any) => {
        console.log(`mongodb has connected to the ${data.connection.host}`)
       })
    }

   
module.exports = connectToDataBase;