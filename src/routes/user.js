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

router.get('/profile', verifyToken, userProfileController);

router.post('/todos', verifyToken, addToDoController);

router.get('/todos', verifyToken, getToDosController);

router.put('/todos/:id', verifyToken, updateToDoController);

router.delete('/todos/:id', verifyToken, deleteToDoController);

module.exports = router;