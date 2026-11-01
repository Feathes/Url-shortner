import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const getToken = (req) => {
    if (req.cookies?.token) return req.cookies.token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
        return req.headers.authorization.split(" ")[1];
    }
    return null;
};

const protect = async (req, res, next) => {
    const token = getToken(req);
    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    try {
        const secret = process.env.JWT_SECRET || "fallback_secret_for_url_shortener";
        const decodedToken = jwt.verify(token, secret);
        req.user = decodedToken;
        next();
    } catch (error) {
        return res.status(401).json({ error: "Invalid or expired token" });
    }
};

const optionalAuth = async (req, res, next) => {
    const token = getToken(req);
    if (token) {
        try {
            const secret = process.env.JWT_SECRET || "fallback_secret_for_url_shortener";
            const decodedToken = jwt.verify(token, secret);
            req.user = decodedToken;
        } catch (error) {
            // Invalid token for optional auth, proceed as guest
        }
    }
    next();
};

export { protect, optionalAuth };