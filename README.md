# The Mark Cookbook

## Project Description

An end-to-end application for cooking lovers, where you can find recipes by a category, or you can search a recipe by its name. You can create new categories and new recipes. You can also edit old recipes and to manage their images!

## Tech stack

The main technologies that are used in this project are:

- JavaScript:
  - [React JS](https://reactjs.org/)
  - [Material UI](https://v4.mui.com/)
  - [Express JS](https://expressjs.com/)
  - [Multer](https://github.com/expressjs/multer)
  - [Passport JS](https://www.passportjs.org/)
  - [Moment JS](https://momentjs.com/)
- [MariaDB](https://mariadb.org/)
- [Docker](https://www.docker.com/)

## Directory Structure

```bash
├── client
│   ├── public
│   │   ├── index.html
│   │   └── logo.png
│   ├── src
│   │   ├── auth
│   │   │   └── **/*.js
│   │   ├── components
│   │   │   ├── Categories
│   │   │   │   ├── Categories
│   │   │   │   │    ├── img
│   │   │   │   │    │    ├── **/*.jpg
│   │   │   │   │    │    └── **/*.png
│   │   │   │   │    └── **/*.js
│   │   │   │   └── CreateCategory
│   │   │   │   │    ├── img
│   │   │   │   │    │    └── **/*.jpg
│   │   │   │   │    └── **/*.js
│   │   │   ├── Common
│   │   │   │   ├── Card
│   │   │   │   │    └── **/*.js
│   │   │   │   ├── Carousel
│   │   │   │   │    ├── **/*.css
│   │   │   │   │    └── **/*.js
│   │   │   │   ├── CustomInput
│   │   │   │   │    └── **/*.js
│   │   │   │   ├── Dropdown
│   │   │   │   │    └── **/*.js
│   │   │   │   ├── InfoArea
│   │   │   │   │    └── **/*.js
│   │   │   │   ├── LoadingSpinner
│   │   │   │   │    ├── **/*.css
│   │   │   │   │    └── **/*.js
│   │   │   │   ├── NavBar
│   │   │   │   │    └── **/*.js
│   │   │   ├── Home
│   │   │   │   ├── Sections
│   │   │   │   │    ├── img
│   │   │   │   │    │    └── **/*.jpg
│   │   │   │   │    └── **/*.js
│   │   │   │   └── **/*.js
│   │   │   ├── Login
│   │   │   │   ├── img
│   │   │   │   │    └── **/*.jpg
│   │   │   │   └── **/*.js
│   │   │   └── Recipes
│   │   │       ├── AddImagws
│   │   │       │    └── **/*.js
│   │   │       ├── AllRecipes
│   │   │       │    ├── img
│   │   │       │    │    ├── **/*.jpg
│   │   │       │    │    └── **/*.png
│   │   │       │    └── **/*.js
│   │   │       ├── CreateRecipe
│   │   │       │    ├── img
│   │   │       │    │    └── **/*.jpg
│   │   │       │    └── **/*.js
│   │   │       ├── RemoveImages
│   │   │       │    └── **/*.js
│   │   │       ├── SingleRecipe
│   │   │       │    ├── img
│   │   │       │    │    └── **/*.jpg
│   │   │       │    └── **/*.js
│   │   │       └── UpdateRecipe
│   │   │            └── **/*.js
│   │   ├── containers
│   │   │   ├── Categories
│   │   │   │   └── **/*.js
│   │   │   ├── Login
│   │   │   │   └── **/*.js
│   │   │   └── Recipes
│   │   │       ├── AllRecipes
│   │   │       │   └── **/*.js
│   │   │       └── SingleRecipe
│   │   │           └── **/*.js
│   │   ├── custom-hooks
│   │   │   └── **/*.js
│   │   ├── App.css
│   │   ├── App.js
│   │   ├── index.css
│   │   └── index.js
│   ├── .dockerignore
│   ├── .eslintrc.js
│   ├── Dockerfile
│   ├── package-lock.json
│   ├── package.json
│   └── README.md
├── database
│   └── cookbook_schema.sql
├── server
│   ├── auth
│   │   └── **/*.js
│   ├── controllers
│   │   └── **/*.controller.js
│   ├── data
│   │   └── **/*.data.js
│   ├── images
│   |   ├── **/*.jpg
│   │   └── **/*.png
│   ├── moddlewares
│   │   └── **/*.js
│   ├── services
│   │   └── **/*.service.js
│   ├── validators
│   │   └── **/*.schema.js
│   ├── .dockerignore
│   ├── .eslintrc.js
│   ├── app.js
│   ├── config.js
│   ├── Dockerfile
│   ├── package-lock.json
│   ├── package.json
│   ├── README.md
│   └── storage.js
├── docker-compose.yml
└── README.md
```

## Running guide

All you need is [Docker Compose](https://docs.docker.com/compose/). [Click here](https://docs.docker.com/compose/install/#install-compose) to get it.

### Start the application

Open a terminal in the root directory and run these commands:

- Build the services

```sh
docker-compose build
```

- Allow Docker to start and run the entire application

```sh
docker-compose up -d
```

### Interact with the application

There are a few options:

- Open `http://localhost:3000/` in a browser to see the web application.
- Open Postman and send a request. See the available endpoints in the readme file in the _server_ directory.
- Open `http://localhost:8080/` to open [phpMyAdmin](https://www.phpmyadmin.net/). It allows you to handle the administration of MySQL over the Web. The username and the password are pointed in the docker-compose.yml file.

### Tear it down

Open a terminal in the root directory and run this command:

```sh
docker-compose down --volumes
```
