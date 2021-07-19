module.exports = (req, res, next) => {
  req.user = { _id: '60e6fca7c4ae40089c200817' };
  next();
};
