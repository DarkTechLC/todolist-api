const { Router } = require('express');

const verifyToken = require('../middlewares/verifyToken');
const registerUserController = require('../controllers/user/registerUser');
const loginUserController = require('../controllers/user/loginUser');
const logoutUserController = require('../controllers/user/logoutUser');
const userProfileController = require('../controllers/user/userProfile');
const addToDoController = require('../controllers/user/addToDo');
const getToDosController = require('../controllers/user/getToDos');
const updateToDoController = require('../controllers/user/updateToDo');
const deleteToDoController = require('../controllers/user/deleteToDo');

const router = Router();

router.post('/register', registerUserController);

router.post('/login', loginUserController);

router.get('/logout', logoutUserController);

router.use(verifyToken);

router.get('/profile', userProfileController);

router.post('/todos', addToDoController);

router.get('/todos', getToDosController);

router.put('/todos/:id', updateToDoController);

router.delete('/todos/:id', deleteToDoController);

module.exports = router;