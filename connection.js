const mongoose = require("mongoose");



async function connectMongooDb(url){
            return mongoose.connect(url);
};

module.exports={
    connectMongooDb,
}
 
