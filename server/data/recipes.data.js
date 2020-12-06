import pool from './pool.js';

const getAll = async () => {
  const availableRecipesSql = `
    SELECT r.recipeID AS 'recipeID', r.name AS 'recipeName', t.category, r.date AS 'addDate', isDeleted
    FROM recipes r
    JOIN categories t ON r.categoryID = t.categoryID
    WHERE isDeleted = 0
    ORDER BY r.recipeID ASC;
  `;

  const availableRecipesData = await pool.query(availableRecipesSql);

  const deletedRecipesSql = `
    SELECT r.recipeID AS 'recipeID', r.name AS 'recipeName', t.category, r.date AS 'addDate', isDeleted
    FROM recipes r
    JOIN categories t ON r.categoryID = t.categoryID
    WHERE isDeleted = 1
    ORDER BY r.recipeID ASC;
  `;

  const deletedRecipesData = await pool.query(deletedRecipesSql);

  return { available: availableRecipesData, deleted: deletedRecipesData };
};

const searchBy = async (
  name = undefined,
  category = undefined,
  order = undefined,
) => {
  let recipesSql = `
      SELECT r.recipeID AS 'recipeID', r.name AS 'recipeName', t.category, r.date AS 'addDate', isDeleted
      FROM recipes r
      JOIN categories t ON r.categoryID = t.categoryID
  `;

  if (name & category) {
    recipesSql += `WHERE r.name LIKE '%${name}% AND t.category LIKE '${category}' `;
  } else if (name) {
    recipesSql += `WHERE r.name LIKE '%${name}%' `;
  } else if (category) {
    recipesSql += `WHERE t.category LIKE '${category}' `;
  }

  if (order) {
    recipesSql += `ORDER BY r.name ${order};`;
  } else {
    recipesSql += 'ORDER BY r.recipeID ASC;';
  }

  return await pool.query(recipesSql);
};

const getById = async (recipeID) => {
  const recipeSql = `
      SELECT r.recipeID AS 'recipeID', r.name AS 'recipeName', t.category, r.date AS 'addDate', r.instructions, isDeleted
      FROM recipes r
      JOIN categories t ON r.categoryID = t.categoryID
      WHERE r.recipeID = ?;
  `;

  const recipeData = await pool.query(recipeSql, [recipeID]);

  const ingredientsSql = `
    SELECT ri.id as recipeIngredientID, ri.amount, m.measure, i.ingredient
    FROM recipe_ingredients ri
    JOIN ingredients i ON i.ingredientID = ri.ingredientID
    LEFT JOIN measures m ON m.measureID = ri.measureID
    WHERE ri.recipeID = ?
  `;

  const ingredientsData = await pool.query(ingredientsSql, [recipeID]);

  const imagesSql = `
    SELECT imageID AS imageID, url
    FROM images
    WHERE recipeID = ?
  `;

  const imagesData = await pool.query(imagesSql, [recipeID]);

  if (recipeData[0]) {
    recipeData[0].ingredients = ingredientsData;
    recipeData[0].images = imagesData;
    return recipeData[0];
  } else {
    return null;
  }
};

const getByName = async (recipeName) => {
  const recipeSql = `
    SELECT r.recipeID AS 'recipeID', r.name AS 'recipeName', t.category, r.date AS 'addDate', r.instructions, isDeleted
    FROM recipes r
    JOIN categories t ON r.categoryID = t.categoryID
    WHERE r.name = ?;
  `;

  const recipeData = await pool.query(recipeSql, [recipeName]);
  return recipeData?.[0];
};

const create = async (recipeName, category, instructions, ingredients) => {
  try {
    const addDate = new Date();
    const insertRecipeSql = `
    INSERT INTO recipes(name, categoryID, instructions, date)
    VALUES(?, (SELECT categoryID FROM categories WHERE category = ?), ?, ?);
    `;

    const insertRecipeData = await pool.query(insertRecipeSql, [
      recipeName,
      category,
      instructions,
      addDate,
    ]);
    const recipeData = {
      recipeID: insertRecipeData.insertId,
      recipeName,
      category,
      addDate,
      instructions,
    };
    const ingredientsData = await Promise.all(
      ingredients.map(async (el) => {
        const { ingredient, measure, amount } = el;

        const ingredientControlSql = `
          SELECT ingredientID
          FROM ingredients
          WHERE ingredient = ?;
      `;

        const ingredientControlData = await pool.query(ingredientControlSql, [
          ingredient,
        ]);

        let ingredientID;
        if (ingredientControlData[0]) {
          ingredientID = ingredientControlData[0].ingredientID;
        } else {
          const insertIngredientSql = `
          INSERT INTO ingredients(ingredient)
          VALUES(?);
        `;

          const insertIngredientData = await pool.query(insertIngredientSql, [
            ingredient,
          ]);
          ingredientID = insertIngredientData.insertId;
        }

        const insertRecipeIngredientSql = `
          INSERT INTO recipe_ingredients(recipeID, ingredientID, measureID, amount)
          VALUES(?, ?, (SELECT measureID FROM measures WHERE measure = ?), ?);
        `;

        const insertRecipeIngredientData = await pool.query(
          insertRecipeIngredientSql,
          [insertRecipeData.insertId, ingredientID, measure, amount],
        );
        return {
          recipeIngredientId: insertRecipeIngredientData.insertId,
          amount,
          measure,
          ingredient,
        };
      }),
    );
    recipeData.ingredients = ingredientsData;
    return recipeData;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default {
  getAll,
  searchBy,
  getById,
  getByName,
  create,
};
