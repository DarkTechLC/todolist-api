const { Router } = require('express');

const registerUserController = require('../controllers/registerUser');
const loginUserController = require('../controllers/loginUser');
const logoutUserController = require('../controllers/logoutUser');
const userProfileController = require('../controllers/userProfile');
const addToDoController = require('../controllers/addToDo');
const getToDosController = require('../controllers/getToDos');
const updateToDoController = require('../controllers/updateToDo');
const deleteToDoController = require('../controllers/deleteToDo');

const router = Router();

router.post('/register', registerUserController);

router.post('/login', loginUserController);

router.get('/logout', logoutUserController);

router.get('/profile', userProfileController);

router.post('/todos', addToDoController);

router.get('/todos', getToDosController);

router.put('/todos/:id', updateToDoController);

router.delete('/todos/:id', deleteToDoController);

module.exports = router;