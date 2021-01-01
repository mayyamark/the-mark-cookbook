# The Mark Cookbook
I am very excited to present you my first personal project!
This is an application for cooking recipes! Here you can find recipes by a category, or you can search a recipe by its name! You can create new categories and new recipes! You can edit old recipes and to manage their images!

# Used packages
- **Backend Packages**: express, cors, body-parser, helmet, passport, passport-jwt, bcrypt, multer, mariadb, moment, eslint, nodemon;

- **Frontend packages**: React, react-dom, react-router-dom, jwt-decode, react-slideshow-image, moment, sweetalert, material-ui, eslint;

# Running Guide
Follow these steps to run our application:
## Step I:
**Import the SQL files**- the schemas and the file with dummy data.

## Step II:
To access this application you should have a **environment file** (.env) file  on the root level in the server directory! The structure should be:

- **PORT**: *server listening port*, if no other chosen, the default would be 5000;
- **DB_USER**: the *username* of your MariaDB account;
- **DB_PASSWORD**: the *password* of your MariaDB account;
- **SECRET_KEY**: a string or buffer containing the secret (symmetric) or PEM-encoded public key (asymmetric) for verifying the token's signature;

## Step III:
Open the Terminal in the server folder and type the following commands:
```
npm i
npm run start:dev
```
**Now my Express server is listening for requests.**

## Step IV:
Open the Terminal in the client folder and type the following commands:
```
npm i
npm start
```
This will run my React application.

## Step V: Enjoy!
