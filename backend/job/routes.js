const router = require('express').Router();
const controller = require('./controllers');
const { auth } = require('../middleware')

router.get(
  '/list',
  auth.authenticate(),
  controller.getList
);

router.get(
  '/:id',
  auth.authenticate(),
  controller.get
)

module.exports = router;