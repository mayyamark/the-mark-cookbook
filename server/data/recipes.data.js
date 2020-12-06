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


export default {
  getAll,
};
