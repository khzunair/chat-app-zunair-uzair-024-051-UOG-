const mongoose = require('mongoose');

const config = require('config');

const db = config.get('mongoURI');

// Free Db 
// const db="mongodb+srv://zunair:zunair@serverlessinstance0.pnbcasw.mongodb.net/?retryWrites=true&w=majority"



const connectDB = async () =>{
    try{  
        await mongoose.connect(db, {
            useNewUrlParser : true,
            // can be deleted below one
            // useUnifiedTopology: true,

        });
        console.log('MongoDB Connected...')
    } catch(err){   
        console.log("Not connected")
        console.log(err.message)
        // Exit process with failure
        process.exit(1)
    }

    
}


module.exports = connectDB;