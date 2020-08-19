const { Router } = require('express');

const registerUserController = require('../controllers/registerUser');
const loginUserController = require('../controllers/loginUser');
const logoutUserController = require('../controllers/logoutUser');
const addToDoController = require('../controllers/addToDo');
const getAllToDosController = require('../controllers/getAllToDos');
const searchToDosController = require('../controllers/searchToDos');
const updateToDoController = require('../controllers/updateToDo');
const deleteToDoController = require('../controllers/deleteToDo');

const router = Router();

router.post('/register', registerUserController);

router.post('/login', loginUserController);

router.get('/logout', logoutUserController);

router.post('/todos', addToDoController);

router.get('/todos', getAllToDosController);

router.get('/todos/search', searchToDosController);

router.put('/todos', updateToDoController);

router.delete('/todos', deleteToDoController);

module.exports = router;