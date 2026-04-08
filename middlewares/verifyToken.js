const jwt = require('jsonwebtoken');
const verifyToken = (req,res,next) => {
    const authHeaders = req.headers['authorization'];

    if(!authHeaders){
        return res.status(401).json({
            message:"No token provided"
        });
    }

    const token = authHeaders.split(' ')[1];

    if(!token){
        return res.status(401).json({
            message:"Invalid token format"
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