const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.get('/users', userController.index);
router.get('/users/new', userController.new);
router.post('/users', userController.create);
router.get('/users/:id', userController.show);
router.get('/users/:id/edit', userController.edit);
router.post('/users/:id', userController.update);
router.post('/users/:id/delete', userController.delete);

module.exports = router;