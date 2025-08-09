const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        
        const token = authHeader && authHeader.split(" ")[1];

        if(!token) {
            return res.status(401).json({
                success : false,
                prompt : `Access denied!! Token not provided, kindly login :(`
            });
        };

        const decodeToken = await jwt.verify(token, process.env.JWT_SECRET_KEY);
        
        req.userInfo = decodeToken;

        return next();
    } catch (error) {
        return res.status(500).json({
            success : false,
            prompt : `Oops!! Access denied!! Token not provided, kindly login :)`,
            error : error
        });
    }
};

module.exports = authMiddleware;