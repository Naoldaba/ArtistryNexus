import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) return res.status(401).send("You are Unauthorized");

        const token = authHeader.split(" ")[1];

        if (!token) return res.status(401).send("You are Unauthorized");

        const isCustomToken = token.length < 500;

        let payload;
        if (token && isCustomToken) {
            payload = jwt.verify(token, process.env.SECRET_KEY);
            req.userID = payload.id;
        } else {
            payload = jwt.decode(token);
            req.userID = payload.sub;
        }
        next();
    
    } catch (error) {
        console.log('error verifying/decoding the token');
        return res.json({"message": "error decoding the token"});
    }
}

export default auth;