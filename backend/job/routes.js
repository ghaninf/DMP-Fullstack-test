const router = require('express').Router();
const controller = require('./controllers');

router.get(
  '/list',
  controller.getList
);

router.get(
  '/:id',
  controller.get
)

module.exports = router;