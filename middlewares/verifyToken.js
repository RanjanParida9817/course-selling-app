const jwt = require('jsonwebtoken');
const verifyToken = (req,res,next) => {
    const token = req.cookies.token;


    if(!token){
        return res.status(401).json({
            message:"No token provided"
        });
    }

    try{
        const decodedData = jwt.verify(token,process.env.SECRET_KEY);
        req.user = decodedData;
        next();

    } catch(error){
        next(error);
    }

}

module.exports = verifyToken;