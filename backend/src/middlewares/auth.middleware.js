import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config()


const protect = async (req, res, next) => {
    const token = req.cookies?.token;
    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedToken;
        next();
    } catch (error) {
        return res.status(401).json({ error: "Invalid or expired token" });
    }
};

const optionalAuth = async (req, res, next) => {
    const token = req.cookies?.token;
    if (token) {
        try {
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decodedToken;
        } catch (error) {
            // Invalid token for optional auth, proceed as guest
        }
    }
    next();
};

export { protect, optionalAuth };