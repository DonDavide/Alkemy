var express = require('express');
var router = express.Router();
const APIController = require('../controllers/APIController');
const userMiddleware = require('../middlewares/user');


router.post('/usersCreate', userMiddleware.usersSearch, userMiddleware.userCreate, APIController.usersLoginNew);
router.post('/users', APIController.usersLogin);

router.get('/operations/:id', APIController.operations);
router.post('/operations/:id', userMiddleware.operationsPostMid, APIController.operationsPost);
router.post('/update/:id', userMiddleware.operationsUpdate, APIController.operationsPost);

router.post('/delete/:id', userMiddleware.operationsDestroy, APIController.operationsDestroy, APIController.operationsPost);

router.get('/categories', APIController.categories);

module.exports = router;