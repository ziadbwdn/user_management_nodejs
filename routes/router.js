// router
// routes/user.routes.js - User API routes

const express = require('express');
const router = express.Router();
const userController = require('../handlers/user-handler');
const { validateUser, validateIdParam } = require('../middleware/validation-middleware');

// GET all users
router.get('/', userController.getAllUsers);

// GET a specific user by ID
router.get('/:id', validateIdParam, userController.getUserById);

// POST create a new user
router.post('/', userController.createUser);

// PUT update an existing user
router.put('/:id', validateIdParam, userController.updateUser);

// DELETE a user
router.delete('/:id', validateIdParam, userController.deleteUser);

module.exports = router;