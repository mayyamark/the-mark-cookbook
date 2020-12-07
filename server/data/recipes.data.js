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
  const availableRecipesWithImgs = await Promise.all(availableRecipesData.map(async (recipe) => {
    const { recipeID } = recipe;

    const imagesSql = `
      SELECT imageID AS imageID, imageName, date AS 'addDate'
      FROM images
      WHERE recipeID = ?
    `;

    const imagesData = await pool.query(imagesSql, [recipeID]);

    return { ...recipe, images: imagesData };
  }));

  const deletedRecipesSql = `
    SELECT r.recipeID AS 'recipeID', r.name AS 'recipeName', t.category, r.date AS 'addDate', isDeleted
    FROM recipes r
    JOIN categories t ON r.categoryID = t.categoryID
    WHERE isDeleted = 1
    ORDER BY r.recipeID ASC;
  `;

  const deletedRecipesData = await pool.query(deletedRecipesSql);
  const deletedRecipesWithImgs = await Promise.all(deletedRecipesData.map(async (recipe) => {
    const { recipeID } = recipe;

    const imagesSql = `
      SELECT imageID AS imageID, imageName, date AS 'addDate'
      FROM images
      WHERE recipeID = ?
    `;

    const imagesData = await pool.query(imagesSql, [recipeID]);

    return { ...recipe, images: imagesData };
  }));

  return { available: availableRecipesWithImgs, deleted: deletedRecipesWithImgs };
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

  const recipesData = await pool.query(recipesSql);
  const recipesWithImgs = await Promise.all(recipesData.map(async (recipe) => {
    const { recipeID } = recipe;

    const imagesSql = `
      SELECT imageID AS imageID, imageName, date AS 'addDate'
      FROM images
      WHERE recipeID = ?
    `;

    const imagesData = await pool.query(imagesSql, [recipeID]);

    return { ...recipe, images: imagesData };
  }));

  return recipesWithImgs;
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
    SELECT imageID AS imageID, imageName, date AS 'addDate'
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
          recipeIngredientID: insertRecipeIngredientData.insertId,
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

const update = async (recipeID, recipeName, category, instructions, ingredients, isDeleted) => {
  try {
    if (recipeName) {
      const updateRecipeNameSql = `
        UPDATE recipes SET name = ?
        WHERE recipeID = ?;
      `;

      await pool.query(updateRecipeNameSql, [recipeName, recipeID]);
    }
    if (category) {
      const updateRecipeCategotySql = `
        UPDATE recipes  SET categoryID = (SELECT categoryID FROM categories WHERE category = ?)
        WHERE recipeID = ?;
      `;

      await pool.query(updateRecipeCategotySql, [category, recipeID]);
    }
    if (instructions) {
      const updateRecipeInstructionsSql = `
        UPDATE recipes SET instructions = ?
        WHERE recipeID = ?;
      `;

      await pool.query(updateRecipeInstructionsSql, [instructions, recipeID]);
    }
    if (isDeleted === 0 || isDeleted === 1) {
      const updateRecipeIsDeletedSql = `
        UPDATE recipes SET isDeleted = ?
        WHERE recipeID = ?;
      `;

      await pool.query(updateRecipeIsDeletedSql, [recipeID, isDeleted]);
    }
    if (ingredients) {
      await Promise.all(
        ingredients.map(async (el) => {
          const { recipeIngredientID, ingredient, measure, amount } = el;

          if (ingredient !== '') {
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

            if (recipeIngredientID !== 0) {
              const updateRecipeIsIngredientSql = `
                UPDATE recipe_ingredients SET ingredientID = ?, measureID = (SELECT measureID FROM measures WHERE measure = ?), amount = ?
                WHERE id = ?;
              `;
              await pool.query(updateRecipeIsIngredientSql, [ingredientID, measure, amount, recipeIngredientID]);

            } else if (recipeIngredientID === 0) {
              const insertRecipeIngredientSql = `
                INSERT INTO recipe_ingredients(recipeID, ingredientID, measureID, amount)
                VALUES(?, ?, (SELECT measureID FROM measures WHERE measure = ?), ?);
              `;

              await pool.query(
                insertRecipeIngredientSql,
                [recipeID, ingredientID, measure, amount],
              );
            }
          } else if (ingredient === '') {
            const deleteRecipeIngredientSql = `
              DELETE FROM recipe_ingredients
              WHERE id = ?
            `;

            await pool.query(deleteRecipeIngredientSql, [recipeIngredientID]);
          }
        }));
    }
    return await getById(recipeID);
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
  update,
};
