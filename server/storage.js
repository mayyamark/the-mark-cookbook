import multer from 'multer';
import moment from 'moment';

moment.locale('en-gb');

const extensionsMap = new Map([
  ['image/png', 'png'],
  ['image/jpeg', 'jpg'],
]);

const generateFileName = (extension) => {
  const currentDate = new Date();
  const firstPart = `${moment(currentDate).format('L').toString().split('/').join('')}${moment(currentDate).format('LTS').toString().split(':').join('')}`;
  const secondPart = Date.now().toString();

  return `${firstPart}_${secondPart}.${extension}`;
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images');
  },
  filename: function (req, file, cb) {
    if (extensionsMap.has(file.mimetype)) {
      const extension = extensionsMap.get(file.mimetype);

      cb(null, generateFileName(extension)); //Appending extension
    } else {
      cb(new Error(`Unsupported mime type: ${file.mimetype}`));
    }
  },
});

export default storage;
