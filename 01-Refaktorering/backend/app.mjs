import 'dotenv/config';

import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import documents from "./routes/documents.mjs";

import "./db/mongodb.mjs";

const port = process.env.PORT || 1337;

const app = express();

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

app.use("/documents", documents);

app.get("/", (req, res) => {
    res.status(200).json({
        message: 'Welcome to the API',
        routes: [
            { method: 'GET', path: "/documents" },
            { method: 'GET', path: "/documents/:id" },
            { method: 'POST', path: "/documents/create" },
            { method: 'PUT', path: "/documents/update/:id" },
            { method: 'DELETE', path: "/documents/delete/:id" }
        ]
    });
});

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

export default server;
