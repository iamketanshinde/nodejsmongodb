const express = require("express");

const router = express.Router();

  
router.get('/', async (req, res) => {
    const allDbUsers = await User.find({});
    // res.setHeader("X-MyName", "PiyushShinde");
    return res.json(allDbUsers);
});

router.route('/:id')
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

router.post('/', async (req, res) => {
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

module.exports = router;
