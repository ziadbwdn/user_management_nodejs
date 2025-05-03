// user handlers
// controllers/user.controller.js - User-related controller functions

const userService = require('../services/user-service');
const { successResponse, errorResponse, notFoundResponse } = require('../utils/response-utils');

// Controller class to handle user-related HTTP requests
class UserHandler {
  // Get all users
  async getAllUsers(req, res) {
    try {
      const users = await userService.getAllUsers();
      return successResponse(res, users, 'Users retrieved successfully');
    } catch (error) {
      return errorResponse(res, error.message);
    }
  }

  // Get user by ID
  async getUserById(req, res) {
    try {
      const user = await userService.getUserById(req.userId);
      return successResponse(res, user, 'User retrieved successfully');
    } catch (error) {
      if (error.statusCode === 404) {
        return notFoundResponse(res, error.message);
      }
      return errorResponse(res, error.message);
    }
  }

  // Create new user
  async createUser(req, res) {
    try {
      // Extract name and email from request body
      const { name, email } = req.body;
      
      // Validate required fields directly in the controller
      if (!name || !email) {
        return errorResponse(res, 'Name and email are required', 400);
      }
      
      const newUser = await userService.createUser(req.body);
      return successResponse(res, newUser, 'User created successfully', 201);
    } catch (error) {
      if (error.statusCode === 409) {
        return errorResponse(res, error.message, 409);
      }
      return errorResponse(res, error.message);
    }
  }

  // Update user
  async updateUser(req, res) {
    try {
      // Extract updated fields from request body
      const { name, email } = req.body;
      
      // Validate required fields directly in the controller
      if (!name || !email) {
        return errorResponse(res, 'Name and email are required', 400);
      }
      
      const updatedUser = await userService.updateUser(req.userId, req.body);
      return successResponse(res, updatedUser, 'User updated successfully');
    } catch (error) {
      if (error.statusCode === 404) {
        return notFoundResponse(res, error.message);
      } else if (error.statusCode === 409) {
        return errorResponse(res, error.message, 409);
      }
      return errorResponse(res, error.message);
    }
  }

  // Delete user
  async deleteUser(req, res) {
    try {
      const deletedUser = await userService.deleteUser(req.userId);
      return successResponse(res, deletedUser, 'User deleted successfully');
    } catch (error) {
      if (error.statusCode === 404) {
        return notFoundResponse(res, error.message);
      }
      return errorResponse(res, error.message);
    }
  }
}

module.exports = new UserHandler();