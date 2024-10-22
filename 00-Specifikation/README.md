# jsramverk

## Week 1 & 2: Specification

### Vulnerabilities
The command `npm audit`identified 5 vulnerabilities, 2 moderate and 3 high.

### Solution
As suggested I ran `npm audit fix`. This time after running `npm audit` again it came up with 3 vulnerabilities. From the report I could read that all 3 could be fixed with the suggested command `npm audit fix --force`.
It worked perfectly, 0 vulnerabilities identified.

-----------------------------

### Steps to make the app work
Use the steps below to make the app work

#### 1. Create .env file
Create a `.env` file in your directory looking like this:

```
PORT=<your-port>
```

#### 2. Install dotenv
Run command in terminal:

```
npm install dotenv
```

#### 3. Init database
Run command in terminal:

```
bash ./db/reset_db.bash
```

#### 4. Create first document
Run command in terminal:

```
echo "INSERT INTO documents (title, content) VALUES ('Initial title', 'Initial content')" | sqlite3 db/docs.sqlite
```

#### 5. Run app
Run command in terminal:

```
node app.mjs
```

#### 6. Open browser
Open browser and go to `localhost:3000` to check out the app.

### Frontend framework
I've decided to go with React as my frontend framwork. It's developed by META/Facebook with a big community. React has been the most popular frontend framework for a long time. There is also React Native which makes it easier to develop mobile apps. With this in mind I believe it's the framework to go for.
