import 'dotenv/config';

import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import docs from "./routes/docRoute.mjs";
import users from "./routes/userRoute.mjs";
import { setupSocket } from "./socketHandler.mjs";
import verifySocketToken from "./middleware/socketAuth.mjs";

const port = process.env.PORT || 1337;

const app = express();

// Dynamisk frontend-URL
const FRONTEND_URL =
    process.env.NODE_ENV === 'production'
        ? 'https://jsramverk-chsc22-ace2bxdsdxfnavfc.northeurope-01.azurewebsites.net/'
        : 'http://localhost:3000';

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: FRONTEND_URL
    }
});

io.use(verifySocketToken);

// socketHandler.mjs
setupSocket(io);

// Starta server
httpServer.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});


app.disable('x-powered-by');
app.set("view engine", "ejs");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// This is middleware called for all routes.
app.use((req, res, next) => {
    console.log(req.method);
    console.log(req.path);
    next();
});

// don't show the log when it is test
if (process.env.NODE_ENV !== 'test') {
    // use morgan to log at command line
    app.use(morgan('combined')); // 'combined' outputs the Apache style LOGs
}

app.use("/docs", docs);
app.use("/users", users);

app.get("/", (req, res) => {
    res.status(200).json({
        message: 'Welcome to the API',
        routes: [
            { method: 'GET', path: "/users/user" },
            { method: 'POST', path: "/users/register" },
            { method: 'POST', path: "/users/login" },
            { method: 'GET', path: "/docs/:id" },
            { method: 'POST', path: "/docs/add_document" },
            { method: 'POST', path: "/docs/share_document" },
            { method: 'PUT', path: "/docs/update_document" },
            { method: 'DELETE', path: "/docs/delete_document" },
        ]
    });
});

export default httpServer;
