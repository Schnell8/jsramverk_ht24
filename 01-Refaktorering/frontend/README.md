# Frontend

Frontend for course [jsramverk](https://jsramverk.se/).

-----------------------------

## Getting started
Follow the one step below to get started

### 1. Npm install
Run command in terminal:

```
npm install
```

-----------------------------

## Available scripts
In the project directory, you can run these commands in terminal:

### `npm start`
Runs the app in the development mode.

### `npm test`
Launches the test runner in the interactive watch mode.

### `npm run build`
Builds the app for production to the `build` folder.

### `npm run deploy`
Uploads `build` folder to server to get access online.

### `npm run eject`
**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

-----------------------------

## Routes
Use localhost:3000 or [student-url](https://www.student.bth.se/~chsc22/editor/) in browser to have a look.

### /
Home page listing all documents with options to update or delete.

### /create
Form to add document.

### /update/:id
Form to update document with given ID.
