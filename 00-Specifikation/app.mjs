import 'dotenv/config'

const port = process.env.PORT;

import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import morgan from 'morgan';

import documents from "./docs.mjs";

const app = express();

app.disable('x-powered-by');

app.set("view engine", "ejs");

app.use(express.static(path.join(process.cwd(), "public")));

// don't show the log when it is test
if (process.env.NODE_ENV !== 'test') {
    // use morgan to log at command line
    app.use(morgan('combined')); // 'combined' outputs the Apache style LOGs
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
    return res.render(
        "index", {
            docs: await documents.getAll()
        }
    );
});

app.get('/add', async (req, res) => {
    return res.render(
        "add", {
        }
    );
});

app.post("/add", async (req, res) => {
    await documents.addOne(req.body);

    return res.redirect(`/`);
});

app.get('/edit/:id', async (req, res) => {
    return res.render(
        "edit", {
            doc: await documents.getOne(req.params.id)
        }
    );
});

app.post("/edit", async (req, res) => {
    const result = await documents.editOne(req.body);

    return res.redirect(`/edit/${req.body.id}?=${result ? 'success' : 'error'}`);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
