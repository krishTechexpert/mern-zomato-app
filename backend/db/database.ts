const mongoose = require('mongoose');

function connectToDataBase(){
       mongoose.set('strictQuery', true);
       mongoose.connect(process.env.DB_URI as string).then((data:any) => {
        console.log(`mongodb has connected to the ${data.connection.host}`)
       })
    }

   
module.exports = connectToDataBase;