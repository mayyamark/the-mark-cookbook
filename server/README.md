# The Mark Cookbook

## Project description

The backend part of the Mark Cookbook app, where you can find recipes by a category, or you can search a recipe by its name. You can create new categories and new recipes. You can also edit old recipes and to manage their images!

## Tech stack

This is a JavaScript application. The main packages, that are used are:

- Express JS
- Passport
- Passport-JWT
- Multer
- MariaDB
- Nodemon
- ES Lint

## Directory Structure

```bash
server
├── auth
│   └── **/*.js
├── controllers
│   └── **/*.controller.js
├── data
│   └── **/*.data.js
├── images
|   ├── **/*.jpg
│   └── **/*.png
├── moddlewares
│   └── **/*.js
├── services
│   └── **/*.service.js
├── validators
│   └── **/*.schema.js
├── .dockerignore
├── .eslintrc.js
├── app.js
├── config.js
├── Dockerfile
├── package-lock.json
├── package.json
├── README.md
└── storage.js
```

## Endpoints

### Authentication

1. **POST/session** - _Logs in the user._

   <details>
   <summary>Click for more details</summary>
    - An example for a request body:

   ```json
   {
     "username": "admin",
     "password": "1234"
   }
   ```

   - An example for a response:

   ```json
   {
     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNjQxNDE2NjM2LCJleHAiOjE2NDE0MjAyMzZ9.0KHXZJpVRe9OxF97uCh_oOVHfql4-8h5cJfa_as5iqw"
   }
   ```

   </details>

### Categories

All of these endpoints require a Bearer token.

1.  **GET/categories** - _Gets all categories._
    <details>
    <summary>Click for more details</summary>

    - Requires a Bearer token.

    - An example for a response:

    ```json
    [
      {
        "categoryID": 1,
        "category": "предястия",
        "images": [
          {
            "name": "Омлет",
            "imageID": 1,
            "imageName": "23122020115709_1608717429151.jpg",
            "addDate": "2020-12-23T11:57:09.000Z"
          },
          {
            "name": "Омлет",
            "imageID": 2,
            "imageName": "23122020115709_1608717429153.png",
            "addDate": "2020-12-23T11:57:09.000Z"
          },
          {
            "name": "Омлет",
            "imageID": 3,
            "imageName": "23122020115709_1608717429165.jpg",
            "addDate": "2020-12-23T11:57:09.000Z"
          }
        ]
      },
      {
        "categoryID": 2,
        "category": "десерти",
        "images": [
          {
            "name": "Шоколадова торта",
            "imageID": 4,
            "imageName": "23122020115623_1608717383614.jpg",
            "addDate": "2020-12-23T11:56:23.000Z"
          },
          {
            "name": "Шоколадова торта",
            "imageID": 5,
            "imageName": "23122020115623_1608717383645.jpg",
            "addDate": "2020-12-23T11:56:23.000Z"
          },
          {
            "name": "Шоколадова торта",
            "imageID": 6,
            "imageName": "23122020115623_1608717383647.jpg",
            "addDate": "2020-12-23T11:56:23.000Z"
          }
        ]
      },
      {
        "categoryID": 3,
        "category": "салати",
        "images": [
          {
            "name": "Шопска салата",
            "imageID": 7,
            "imageName": "23122020115549_1608717349844.jpg",
            "addDate": "2020-12-23T11:55:49.000Z"
          },
          {
            "name": "Шопска салата",
            "imageID": 8,
            "imageName": "23122020115549_1608717349850.jpg",
            "addDate": "2020-12-23T11:55:49.000Z"
          },
          {
            "name": "Шопска салата",
            "imageID": 9,
            "imageName": "23122020120012_1608717612080.jpg",
            "addDate": "2020-12-23T12:00:12.000Z"
          }
        ]
      }
    ]
    ```

    </details>

1.  **POST/categories** - _Creates a new category._

    <details>
    <summary>Click for more details</summary>
     - Requires a Bearer token
     - An example for a request body:

    ```json
    {
      "categoryName": "ястия с пилешко месо"
    }
    ```

    - An example for a response:

    ```json
    {
      "categoryID": 4,
      "category": "ястия с пилешко месо",
      "images": []
    }
    ```

    </details>

### Measures

All of these endpoints require a Bearer token.

1.  **GET/measures** - _Gets all measures._
    <details>
    <summary>Click for more details</summary>

        - Requires a Bearer token.

        - An example for a response:

        ```json
        [
        {
            "measureID": 1,
            "measure": "ч. ч."
        },
        {
            "measureID": 2,
            "measure": "к. ч."
        },
        {
            "measureID": 3,
            "measure": "с. л."
        },
        {
            "measureID": 4,
            "measure": "ч. л."
        },
        {
            "measureID": 5,
            "measure": "гр."
        },
        {
            "measureID": 6,
            "measure": "кг."
        },
        {
            "measureID": 7,
            "measure": "бр."
        },
        {
            "measureID": 8,
            "measure": "мл."
        },
        {
            "measureID": 9,
            "measure": "щипка"
        }

    ]

    ```

        </details>

    ```

1.  **POST/measures** - _Creates a new measure._

    <details>
    <summary>Click for more details</summary>
     - Requires a Bearer token
     - An example for a request body:

    ```json
    {
      "measureName": "л."
    }
    ```

    - An example for a response:

    ```json
    {
      "measureID": 10,
      "measureName": "л."
    }
    ```

    </details>

### Recipes

All of these endpoints require a Bearer token.

1.  **GET/recipes** - _Gets all recipes with optional query parameters._
    <details>
    <summary>Click for more details</summary>

        - Requires a Bearer token.

        - Optional query params:
          - name - partial recipe name
          - category - category name
          - order - one of: _asc_, _desc_
        - An example: `GET/recipes?name=омлет&type=предястия`

        - An example for a response:

        ```json
        [
        {
            "recipeID": 1,
            "recipeName": "Омлет",
            "category": "предястия",
            "addDate": "2020-10-07T18:46:40.000Z",
            "isDeleted": 0,
            "images": [
                {
                    "imageID": 1,
                    "imageName": "23122020115709_1608717429151.jpg",
                    "addDate": "2020-12-23T11:57:09.000Z"
                },
                {
                    "imageID": 2,
                    "imageName": "23122020115709_1608717429153.png",
                    "addDate": "2020-12-23T11:57:09.000Z"
                },
                {
                    "imageID": 3,
                    "imageName": "23122020115709_1608717429165.jpg",
                    "addDate": "2020-12-23T11:57:09.000Z"
                }
            ]
        }

    ]

    ```

        </details>

    ```

1.  **GET/recipes/:id** - _Gets a single recipe by its id._
      <details>
      <summary>Click for more details</summary>

    - Requires a Bearer token.

    - An example: `GET/recipes/2`

    - An example for a response:

          ```json
          {
            "recipeID": 2,
            "recipeName": "Шоколадова торта",
            "category": "десерти",
            "addDate": "2020-10-08T10:46:40.000Z",
            "instructions": "Смесете всички съставки. Поставете тестото в намазнена и набрашнена тава. Печете на 180 градуса за 40 мин.",
            "isDeleted": 0,
            "ingredients": [
              {
                "recipeIngredientID": 2,
                "amount": 3,
                "measure": "бр.",
                "ingredient": "яйца"
              },
              {
                "recipeIngredientID": 3,
                "amount": 1,
                "measure": "щипка",
                "ingredient": "сол"
              },
              {
                "recipeIngredientID": 4,
                "amount": 2,
                "measure": "ч. ч.",
                "ingredient": "захар"
              },
              {
                "recipeIngredientID": 5,
                "amount": 100,
                "measure": "гр.",
                "ingredient": "шоколад"
              }
            ],
            "images": [
              {
                "imageID": 4,
                "imageName": "23122020115623_1608717383614.jpg",
                "addDate": "2020-12-23T11:56:23.000Z"
              },
              {
                "imageID": 5,
                "imageName": "23122020115623_1608717383645.jpg",
                "addDate": "2020-12-23T11:56:23.000Z"
              },
              {
                "imageID": 6,
                "imageName": "23122020115623_1608717383647.jpg",
                "addDate": "2020-12-23T11:56:23.000Z"
              }
            ]
          }
          ```

      </details>

1.  **POST/recipes** - _Creates a new recipe._

    <details>
    <summary>Click for more details</summary>
     - Requires a Bearer token
     - An example for a request body:

    ```json
    {
      "recipeName": "Овчарска салата",
      "category": "салати",
      "instructions": "Нарежете доматите и краставиците. Добавете нарязаните гъби и шунка. Рендосайте кашкавала. Добавете сол, зехтин и оцет на вкус",
      "ingredients": [
        { "ingredient": "домати", "measure": "гр.", "amount": "200" },
        { "ingredient": "краставици", "measure": "гр.", "amount": "200" },
        { "ingredient": "кашкавал", "measure": "гр.", "amount": "100" },
        { "ingredient": "шунка", "measure": "гр.", "amount": "100" },
        { "ingredient": "гъби", "measure": "гр.", "amount": "50" }
      ]
    }
    ```

    - An example for a response:

    ```json
    {
      "recipeID": 4,
      "recipeName": "Овчарска салата",
      "category": "салати",
      "addDate": "2022-01-05T21:23:05.436Z",
      "instructions": "Нарежете доматите и краставиците. Добавете нарязаните гъби и шунка. Рендосайте кашкавала. Добавете сол, зехтин и оцет на вкус",
      "ingredients": [
        {
          "recipeIngredientID": 9,
          "amount": "200",
          "measure": "гр.",
          "ingredient": "домати"
        },
        {
          "recipeIngredientID": 10,
          "amount": "200",
          "measure": "гр.",
          "ingredient": "краставици"
        },
        {
          "recipeIngredientID": 13,
          "amount": "100",
          "measure": "гр.",
          "ingredient": "кашкавал"
        },
        {
          "recipeIngredientID": 11,
          "amount": "100",
          "measure": "гр.",
          "ingredient": "шунка"
        },
        {
          "recipeIngredientID": 12,
          "amount": "50",
          "measure": "гр.",
          "ingredient": "гъби"
        }
      ]
    }
    ```

    </details>

1.  **PUT/recipes/:id** - _Updates the given recipe._

        <details>
        <summary>Click for more details</summary>

    - Requires a Bearer token
    - Available options:
    - Add/Update/Delete ingredient
    - Show/Hide the recipe
    - An example: `PUT/recipes/`
    - An examples for a request body:

      - Update the instructions

        ```json
        {
          "instructions": "Нарежете зеленчуците. Рендосайте кашкавала и сиренето, нарежете шунката и ги смесете със зеленчуците. Добавете сол, зехтин и оцет на вкус."
        }
        ```

      - Add an ingredient

        ```json
        {
          "ingredients": [
            {
              "recipeIngredientID": 0,
              "amount": "100",
              "measure": "гр.",
              "ingredient": "сирене"
            },
            {
              "recipeIngredientID": 0,
              "amount": "100",
              "measure": "гр.",
              "ingredient": "чушка"
            }
          ]
        }
        ```

      - Update an ingredient

        ```json
        {
          "ingredients": [
            {
              "recipeIngredientID": 12,
              "amount": 100,
              "measure": "гр.",
              "ingredient": "гъби"
            }
          ]
        }
        ```

      - Delete an ingredient

        ```json
        {
          "ingredients": [
            {
              "recipeIngredientID": 15,
              "amount": "100",
              "measure": "гр.",
              "ingredient": ""
            }
          ]
        }
        ```

      - Hide the recipe

        ```json
        {
          "isDeleted": 1
        }
        ```

      - Show the recipe

        ```json
        {
          "isDeleted": 0
        }
        ```

    - An example for a response: see the get recipe by ID response

        </details>

### Images

1.  **POST/recipes/:recipeID/images** - _Upload an image to a recipe._

    <details>
    <summary>Click for more details</summary>
      
      - Requires a Bearer token
      - An example: `POST/recipes/4/images`
      - Required request body: 1 or more images as FormData, the needed key is `images`

    - An example for a response:

    ```json
    [
      {
        "imageID": 10,
        "imageName": "07012022191148_1641582708674.jpg",
        "addDate": "2022-01-07T19:11:48.737Z"
      },
      {
        "imageID": 11,
        "imageName": "07012022191148_1641582708709.jpg",
        "addDate": "2022-01-07T19:11:48.737Z"
      }
    ]
    ```

    </details>

1.  **DELETE/recipes/:recipeID** - _Deletes an image/images to a recipe._

        <details>
        <summary>Click for more details</summary>

    - Requires a Bearer token
    - An example: `DELETE/recipes/3/images`
    - Required request body: an array with image IDs

      ```json
      [9]
      ```

    - An example for a response:

      ```json
      {
        "deleted": [
          {
            "addDate": "2020-12-23T12:00:12.000Z",
            "imageID": 9,
            "imageName": "23122020120012_1608717612080.jpg"
          }
        ],
        "available": [
          {
            "imageID": 1,
            "imageName": "23122020115709_1608717429151.jpg",
            "addDate": "2020-12-23T11:57:09.000Z"
          },
          {
            "imageID": 2,
            "imageName": "23122020115709_1608717429153.png",
            "addDate": "2020-12-23T11:57:09.000Z"
          },
          {
            "imageID": 3,
            "imageName": "23122020115709_1608717429165.jpg",
            "addDate": "2020-12-23T11:57:09.000Z"
          }
        ]
      }
      ```

        </details>

## Environment variables

| Environment Variable | Default value |
| :------------------- | :------------ |
| DB_HOST              | localhost     |
| DB_USER              | root          |
| DB_PASSWORD          | root          |
| SERVER_PORT          | 5000          |
| SERVER_SECRET_KEY    | ""            |

## Running Guide

### 1. Install the dependencies

To install the dependencies in the project directory, run:

```sh
npm install
```

### 2. Install and start MariaDB

[Click here](https://mariadb.com/kb/en/getting-installing-and-upgrading-mariadb/) to get MariaDB. Follow the running guide.

### 3. Run the SQL script from the `database` directory

### 4. Start the application

Then to start the application, run:

```sh
npm start
```

Wait until you see `Listening for hungry people on port 5000!` in the Terminal.
Open Postman and make a request.
The server will reload if you make edits.
