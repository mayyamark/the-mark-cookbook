import pool from './pool.js';

const getAll = async () => {
  const categoriesSql = `
    SELECT *
    FROM categories
  `;

  const categoriesData = await pool.query(categoriesSql);
  return categoriesData;
};

export default {
  getAll,

};