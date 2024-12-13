const mongoose = require("mongoose");


mongoose.set("strictQuery",true);
async function connectMongooDb(url){
        return mongoose.connect(url);
};

module.exports={
    connectMongooDb,
}
 
