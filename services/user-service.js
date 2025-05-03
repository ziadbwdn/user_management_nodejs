// user services
const User = require('../models/model');

class UserService {
  // Get all users
  async getAllUsers() {
    try {
      return await User.findAll();
    } catch (error) {
      throw new Error(`Error retrieving users: ${error.message}`);
    }
  }

  // Get user by ID
  async getUserById(id) {
    try {
      const user = await User.findById(id);
      
      if (!user) {
        const error = new Error('User not found');
        error.statusCode = 404;
        throw error;
      }
      
      return user;
    } catch (error) {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      throw error;
    }
  }

  // Create new user
  async createUser(userData) {
    try {
      // Check if email already exists
      const existingUser = await User.findByEmail(userData.email);
      if (existingUser) {
        const error = new Error('Email already in use');
        error.statusCode = 409; // Conflict
        throw error;
      }
      
      return await User.create(userData);
    } catch (error) {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      throw error;
    }
  }

  // Update user
  async updateUser(id, userData) {
    try {
      // Check if user exists
      const existingUser = await User.findById(id);
      if (!existingUser) {
        const error = new Error('User not found');
        error.statusCode = 404;
        throw error;
      }
      
      // Check if email is already in use by another user
      if (userData.email !== existingUser.email) {
        const emailUser = await User.findByEmail(userData.email);
        if (emailUser && emailUser.id !== parseInt(id)) {
          const error = new Error('Email already in use by another user');
          error.statusCode = 409; // Conflict
          throw error;
        }
      }
      
      return await User.update(id, userData);
    } catch (error) {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      throw error;
    }
  }

  // Delete user
  async deleteUser(id) {
    try {
      const user = await User.remove(id);
      
      if (!user) {
        const error = new Error('User not found');
        error.statusCode = 404;
        throw error;
      }
      
      return user;
    } catch (error) {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      throw error;
    }
  }
}

module.exports = new UserService();