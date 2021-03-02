var express = require('express');
var router = express.Router();
const APIController = require('../controllers/APIController');
const userMiddleware = require('../middlewares/user');

router.get('/users', APIController.users);

router.get('/operations/:id', APIController.operations);
router.post('/operations/:id', userMiddleware.operationsPostMid, APIController.operationsPost);
router.post('/update/:id', userMiddleware.operationsUpdate, APIController.operationsPost);

router.get('/delete/:id', userMiddleware.operationsDestroy, APIController.operationsDestroy, APIController.operations);

router.get('/categories', APIController.categories);

module.exports = router;