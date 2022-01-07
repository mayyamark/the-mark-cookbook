# The Mark Cookbook Frontend

## Project description

The frontend part of the Mark Cookbook app, where you can find recipes by a category, or you can search a recipe by its name. You can create new categories and new recipes. You can also edit old recipes and to manage their images!

## Tech stack

This is a JavaScript application. The main packages, that are used are:
react-dom, react-router-dom, jwt-decode, react-slideshow-image, moment, sweetalert, material-ui, eslint;

- ReactJS
- React DOM
- React Router DOM
- Material UI
- React Slideshow Image
- ES Lint
- Moment JS
- Sweetalert

The project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Directory Structure

```bash
client
├── public
│   ├── index.html
│   └── logo.png
├── src
│   ├── auth
│   │   └── **/*.js
│   ├── components
│   │   ├── Categories
│   │   │   ├── Categories
│   │   │   │    ├── img
│   │   │   │    │    ├── **/*.jpg
│   │   │   │    │    └── **/*.png
│   │   │   │    └── **/*.js
│   │   │   └── CreateCategory
│   │   │   │    ├── img
│   │   │   │    │    └── **/*.jpg
│   │   │   │    └── **/*.js
│   │   ├── Common
│   │   │   ├── Card
│   │   │   │    └── **/*.js
│   │   │   ├── Carousel
│   │   │   │    ├── **/*.css
│   │   │   │    └── **/*.js
│   │   │   ├── CustomInput
│   │   │   │    └── **/*.js
│   │   │   ├── Dropdown
│   │   │   │    └── **/*.js
│   │   │   ├── InfoArea
│   │   │   │    └── **/*.js
│   │   │   ├── LoadingSpinner
│   │   │   │    ├── **/*.css
│   │   │   │    └── **/*.js
│   │   │   ├── NavBar
│   │   │   │    └── **/*.js
│   │   ├── Home
│   │   │   ├── Sections
│   │   │   │    ├── img
│   │   │   │    │    └── **/*.jpg
│   │   │   │    └── **/*.js
│   │   │   └── **/*.js
│   │   ├── Login
│   │   │   ├── img
│   │   │   │    └── **/*.jpg
│   │   │   └── **/*.js
│   │   └── Recipes
│   │       ├── AddImagws
│   │       │    └── **/*.js
│   │       ├── AllRecipes
│   │       │    ├── img
│   │       │    │    ├── **/*.jpg
│   │       │    │    └── **/*.png
│   │       │    └── **/*.js
│   │       ├── CreateRecipe
│   │       │    ├── img
│   │       │    │    └── **/*.jpg
│   │       │    └── **/*.js
│   │       ├── RemoveImages
│   │       │    └── **/*.js
│   │       ├── SingleRecipe
│   │       │    ├── img
│   │       │    │    └── **/*.jpg
│   │       │    └── **/*.js
│   │       └── UpdateRecipe
│   │            └── **/*.js
│   ├── containers
│   │   ├── Categories
│   │   │   └── **/*.js
│   │   ├── Login
│   │   │   └── **/*.js
│   │   └── Recipes
│   │       ├── AllRecipes
│   │       │   └── **/*.js
│   │       └── SingleRecipe
│   │           └── **/*.js
│   ├── custom-hooks
│   │   └── **/*.js
│   ├── App.css
│   ├── App.js
│   ├── index.css
│   └── index.js
├── .dockerignore
├── .eslintrc.js
├── Dockerfile
├── package-lock.json
├── package.json
└── README.md
```

## Available scripts

In the project directory, you can run:

### Start

```sh
npm start
```

Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser. The page will reload if you make edits.

### Build

```sh
npm run build
```

Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance. The build is minified and the filenames include the hashes. The app is ready to be deployed!

### Eject

```sh
npm run eject
```

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
