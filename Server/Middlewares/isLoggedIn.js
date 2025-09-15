const jwt = require('jsonwebtoken');

const isLoggedIn = async(req,res,next)=>{
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if(!token){
            return res.status(401).json({message:"Unauthorized"})
        }

        const decoded = await jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();
        
    } catch (error) {
        console.error("Error in isLoggedIn middleware:", error);
        res.status(500).json({message:"Internal Server Error"});
    }
}

module.exports = isLoggedIn;