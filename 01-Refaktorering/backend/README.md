# Backend

Backend for course [jsramverk](https://jsramverk.se/).

-----------------------------

## Getting started
Follow the two steps below

### 1. Npm install
Run command in terminal:

```
npm install
```

### 2. .env setup
Create .env file in root of repo looking like this:

```
PORT=1337
DB_USERNAME=<your-mongodb-username>
DB_PASSWORD=<your-mongodb-password>
```

-----------------------------

## Available scripts
In the project directory, you can run:

### `npm start`
Runs the app.

### `npm run dev`
Runs the app in development mode.

### `npm test`
Runs tests along with eslint. Mongodb needs to be up and running for test to work.

-----------------------------

## API routes
Use localhost:1337 or [azure-url](https://jsramverk-chsc22-ace2bxdsdxfnavfc.northeurope-01.azurewebsites.net/) in browser to have a look.

### GET /
Landing page with available routes shown.

### GET /documents
Lists all documents.

### GET /documents/:id
Lists document with given ID.

### POST /document/create
Adds new document.

### PUT /document/:id
Updates document with given ID.

### DELETE /document/:id
Deletes document with given ID.