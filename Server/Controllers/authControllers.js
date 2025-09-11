const User = require('../Models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
        const {name, email, password} = req.body;

    const existingUser = await User.find({email});

    if(existingUser.length > 0) {
        return res.status(400).json({
            message: 'User already exists'
        })
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const profileImage = await `https://api.dicebear.com/9.x/avataaars/svg?seed=${name}`

    const user = await new User({
        name,
        email,
        password:hashedPassword,
        profileImage
    });
    await user.save();
    res.status(200).json(user);
}

module.exports = {
    registerUser,
}