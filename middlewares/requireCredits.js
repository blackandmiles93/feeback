module.exports = (req, res, next) => {
  // checks to see if user has enough credits
  if (req.user.credits < 1) {
    return res.status(403).send({ error: 'You need more credits!' });
  }

  next();
};
