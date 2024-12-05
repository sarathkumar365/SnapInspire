const express = require('express');
const router = express.Router();

const verifyToken = require('../utils/factoryFunctions')

const {getUserDetails} = require('../utils/factoryFunctions')

// CONTROLLERS
const  userController = require('../controllers/userController');
const postsController = require('../controllers/authController')

router.post('/', userController.createUser);
router.get('/', userController.getAllUsers);
router.delete('/:id',userController.deleteUser)

// GENERAL
// GET User details
router.get('/getUserDetails',getUserDetails)

// ADMIN
router.get('/deleteall', userController.deleteAllUsers);

module.exports = router
