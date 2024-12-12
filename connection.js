const mongoose = require("mongoose");


mongoose.connect('mongodb://127.0.0.1:27017/MongoDb-local-host')
  .then(() => console.log('MongoDb Connected'))
  .catch((err) => console.error('Mongo Connection Error:', err));
 
