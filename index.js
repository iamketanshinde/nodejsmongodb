const express = require('express');
const PORT = 4000;
const app = express();

const { connectMongooDb } = require('./connection.js');
const { logReqRes } = require('./middleware');
const userRoutes = require('./routes/user');

// Connect to MongoDB
connectMongooDb('mongodb://127.0.0.1:27017/MongoDb-local-host')
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.error('MongoDB Connection Error:', err));


app.use(express.urlencoded({ extended: false }));

// Logging middleware
app.use(logReqRes('log.txt'));

// User routes
app.use('/api/users', userRoutes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
