const router = require('express').Router();

const users = require('../controllers/user');

const { getCurrentUser, updateUserInfo } = users;

router.get('/users/me', getCurrentUser);
router.patch('/users/me', updateUserInfo);

module.exports = router;
