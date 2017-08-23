module.exports = (req, res, next) => {
  //checks to make sure is user object is not returned (illegal route travel) then throw an error and prevent the request
  if (!req.user) {
    return res.status(401).send({ error: 'You must be logged in.' });
  }

  next();
};
