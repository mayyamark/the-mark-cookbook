import pool from './pool.js';

const getAll = async () => {
  const measuresSql = `
    SELECT *
    FROM measures
  `;

  const measuresData = await pool.query(measuresSql);
  return measuresData;
};

export default {
  getAll,

};