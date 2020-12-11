import pool from './pool.js';

const add = async (recipeID, filesData) => {
  try {
    const imagesData = await Promise.all(
      filesData.map(async (file) => {
        const addDate = new Date();
        const { filename } = file;

        const insertSql = `
        INSERT INTO images(recipeID, imageName, date)
        VALUES(?, ?, ?);
      `;

        const insertData = await pool.query(insertSql, [
          recipeID,
          filename,
          addDate,
        ]);

        return {
          imageID: insertData.insertId,
          imageName: filename,
          addDate,
        };
      }),
    );

    return imagesData;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const remove = async (recipeID, imagesIDs) => {
  try {
    const deletedImagesData = await Promise.all(
      imagesIDs.map(async (imageID) => {
        const imageSql = `
          SELECT imageID AS imageID, imageName, date AS 'addDate'
          FROM images
          WHERE imageID = ?
        `;

        const imageData = await pool.query(imageSql, [imageID]);

        const removeSql = `
          DELETE FROM images
          WHERE imageID = ?
        `;

        await pool.query(removeSql, [imageID]);
        return imageData;
      }),
    );

    const availableImagesSql = `
      SELECT imageID AS imageID, imageName, date AS 'addDate'
      FROM images
      WHERE recipeID = ?
    `;

    const availableImagesData = await pool.query(availableImagesSql, [recipeID]);

    return { deleted: deletedImagesData, available: availableImagesData };
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default {
  add,
  remove,
};
