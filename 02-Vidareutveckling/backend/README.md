# Backend

Backend for course [jsramverk](https://jsramverk.se/).

-----------------------------

## Getting started
Follow the two steps below to get started

### 1. Npm install
Run command in terminal:

```
npm install
```

### 2. .env setup
Create .env file in root of this dir looking like this:

```
PORT=1337
DB_USERNAME=<your-mongodb-username>
DB_PASSWORD=<your-mongodb-password>
MAILGUN_API_KEY=<your-mailgun-apikey>
MAILGUN_DOMAIN=<your-mailgun-domain>
JWT_SECRET=<your-jwt-secret>
NODE_ENV=development (set to production for prod.)
```

-----------------------------

## Available scripts
In the project directory, you can run these commands in terminal:

### `npm start`
Runs the app.

### `npm run dev`
Runs the app in development mode.

### `npm test`
Runs tests along with eslint. Mongodb needs to be up and running for test to work. (No tests for 02-Vidareutveckling)

-----------------------------

## API routes
Use localhost:1337 or [azure-url](https://jsramverk-chsc22-ace2bxdsdxfnavfc.northeurope-01.azurewebsites.net/) in browser to have a look. (azure-url not available at the moment)

### GET /
Available routes shown.

### GET /users/user
Get user.

### POST /users/register
Register user.

### POST /users/login
Login user.

### GET /docs/:id
Get document with given ID.

### POST /docs/add_document
Adds new document.

### POST /docs/share_document
Share document with given email.

### PUT /docs/update_document
Updates document.

### DELETE /docs/delete_document
Deletes document.
