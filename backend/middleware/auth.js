import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) return res.status(401).send("You are Unauthorized");

        const token = authHeader.split(" ")[1];

        if (!token) return res.status(401).send("You are Unauthorized");

        const payload = jwt.verify(token, process.env.SECRET_KEY);
        req.userID = payload.id;

        next();
    
    } catch (error) {
        console.error('Error verifying/decoding the token:', error);
        return res.status(401).json({ message: "Error decoding the token" });
    }
}

export default auth;

