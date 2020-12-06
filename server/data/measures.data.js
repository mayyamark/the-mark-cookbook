import pool from './pool.js';

const getAll = async () => {
  const measuresSql = `
    SELECT *
    FROM measures
  `;

  const measuresData = await pool.query(measuresSql);
  return measuresData;
};

const getByName = async (measureName) => {
  const measureSql = `
    SELECT *
    FROM measures
    WHERE measure = ?;
  `;

  const measureData = await pool.query(measureSql, [measureName]);
  return measureData?.[0];
};

const create = async (measureName) => {
  const insertSql =  `
    INSERT INTO measures(measure)
    VALUES(?);
  `;

  const insertData = await pool.query(insertSql, [measureName]);
  return insertData.insertId;
};
export default {
  getAll,
  getByName,
  create,
};