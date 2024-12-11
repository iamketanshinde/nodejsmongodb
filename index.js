const { Timestamp } = require('bson');
const express = require('express');
const PORT = 4000;
const fs = require("fs");
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/MongoDb-local-host')
  .then(() => console.log('MongoDb Connected'))
  .catch((err) => console.error('Mongo Connection Error:', err));
 
    
const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    gender: {
        type: String,
    },
    job_title: {
        type: String,
    }
},{timestamps:true});

const User = mongoose.model('User', userSchema);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());  

app.use((req, res, next) => {
    fs.appendFile(
        'log.txt',
        `${Date.now()}:${req.method}:${req.path}\n`,
        (err) => {
            if (err) console.error('Error logging request:', err);
            next();
        }
    );
});

// Define Routes
app.get('/users', async (req, res) => {
    const allDbUsers = await User.find({});
    const html = `
        <ul>
            ${allDbUsers.map(user => `<li>${user.first_name} - ${user.email}</li>`).join("")}
        </ul>
    `;
    res.send(html);
});
  
app.get('/api/users', async (req, res) => {
    const allDbUsers = await User.find({});
    // res.setHeader("X-MyName", "PiyushShinde");
    return res.json(allDbUsers);
});

app.route('/api/users/:id')
    .get(async (req, res) => {
            const user = await User.findById(req.params.id);
            if (!user) return res.status(404).json({ error: 'User not found' });
            return res.json(user);
    })
    .patch(async(req, res) => { 
        await User.findByIdAndUpdate(req.params.id,{last_name:"changed"})
        return res.json({ status: "success" });
    })
    .delete(async(req, res) => {
        await User.findByIdAndDelete(req.params.id)
        return res.json({ status: "success" });
    });

app.post('/api/users/', async (req, res) => {
    try {
        const { first_name, last_name, email, gender, job_title } = req.body;
        if (!first_name || !email || !gender || !job_title) {
            return res.status(400).json({ msg: 'All fields are required!' });
        }
        const newUser = new User({ first_name, last_name, email, gender, job_title });
        await newUser.save();
        return res.status(201).json({ msg: 'User created successfully', user: newUser });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to create user' });
    }
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
