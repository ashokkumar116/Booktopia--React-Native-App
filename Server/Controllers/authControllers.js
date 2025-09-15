const User = require('../Models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
    const {username, email, password} = req.body;

    const existingUser = await User.find({email});

    if (existingUser.length > 0) {
        return res.status(400).json({
            message: 'User already exists'
        })
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const profileImage = await `https://api.dicebear.com/9.x/avataaars/svg?seed=${username}`

    const user = await new User({
        username,
        email,
        password: hashedPassword,
        profileImage
    });
    await user.save();
    res.status(200).json({
        message: 'Successfully registered',
        user
    });
}


const loginUser = async (req, res) => {
    const {email, password} = req.body;

    const [user] = await User.find({email});

    console.log(user);

    if (!user) {
        return res.status(400).json({
            message: 'User does not exist'
        })
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        return res.status(400).json({
            message: 'Wrong password, try again'
        })
    }

    const token = jwt.sign({
            _id:user.id,
            email: user.email,
            username: user.username,
            profileImage: user.profileImage
        }, process.env.JWT_SECRET,
        {expiresIn: '1d'}
    );


    return res.status(200).json({
        token,
        user
    })


}

module.exports = {
    registerUser,
    loginUser
}