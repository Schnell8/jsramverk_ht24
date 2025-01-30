import jwt from "jsonwebtoken";
import 'dotenv/config';

const verifySocketToken = (socket, next) => {
    const token = socket.handshake.auth.token; // token från frontend

    if (!token) {
        return next(new Error("Authentication error: No token provided"));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // veifiera token
        socket.user = decoded; // lagra användare
        next();
    } catch (error) {
        return next(new Error("Authentication error: Invalid token"));
    }
};

export default verifySocketToken;
