const jwt = require('jsonwebtoken');

/* const { NODE_ENV, JWT_SECRET } = process.env;
const UnauthorizedError = require('../errors/unauthorized-error'); */

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    console.log('Ошибки пока не написаны, лови меня');
    res.status(401).send('Authorization required');
/*     const err = new UnauthorizedError('Authorization required');
    next(err); */
    return;
  }
  let payload;
  try {
    payload = jwt.verify(token, 'verysecretword');
  } catch (e) {
/*     const err = new UnauthorizedError('Authorization required');
    next(err); */
    console.log('Ошибки пока не написаны, лови меня');
    res.status(401).send('Authorization required');
    return;
  }
  req.user = payload;
  next();
};

module.exports = {
  auth,
};
