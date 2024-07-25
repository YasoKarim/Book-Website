const jwt = require('jsonwebtoken');

// Verify Token
function verifyToken(req,res,next){
    const token = req.headers.token;
    if(token){
        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            req.user = decoded;
            next();
        }
        catch(err){
            return res.status(401).json({message: "Invalid token"});
        }
    }
    else{
        return res.status(401).json({message: "No Token is provided" });
    }
}

// Verify Token and Authorie the user
function verifyTokenAndAuthorization(req,res,next){
    verifyToken(req,res,() => {
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        }
            else{
                return res.status(403).json({message: "You are not allowed"});
            }
    });
}

    // Verify Token and Authorie the user
function verifyTokenAndAdmin(req,res,next){
    verifyToken(req,res,() => {
        if(req.user.isAdmin)
            {
            next();
            }
        else{
                return res.status(403).json({message: "You are not allowed, only admin is allowed"});
            }
    });
}

module.exports = {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin
}