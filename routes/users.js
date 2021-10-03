const router = require('express').Router();
const { User, Page } = require('../models');
const { userList, userPages } = require('../views');

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.send(userList(users));
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.id },
      include: { model: Page },
    });
    if (!user) {
      const error = new Error(`User ${req.params.id} Not Found`);
      error.status = 404;
      throw error;
    }
    res.send(userPages(user, user.pages));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
