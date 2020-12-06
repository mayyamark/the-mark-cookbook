const addVersionHeader = (req, res, next) => {
  res.set('X-API-Version', '1.0');
  next();
};

export default addVersionHeader;
