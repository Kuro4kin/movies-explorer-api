const router = require('express').Router();

const { createUser, login } = require('../controllers/user');
const auth = require('../middlewares/auth');
const errorHandler = require('../middlewares/error-handler');
const userRoutes = require('./user');


router.post('/signup', createUser);
router.get('/signin', login);
router.use(auth);
router.use(userRoutes);
router.use(errorHandler);

module.exports = router;