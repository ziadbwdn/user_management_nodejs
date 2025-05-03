// validation middleware - Request validation middleware

// Validate user input for creating or updating a user
const validateUser = (req, res, next) => {
    const { name, email } = req.body;
    const errors = [];
  
    // Check if name is provided and valid
    if (!name || name.trim() === '') {
      errors.push('Name is required');
    } else if (name.length > 100) {
      errors.push('Name cannot exceed 100 characters');
    }
  
    // Check if email is provided and valid
    if (!email || email.trim() === '') {
      errors.push('Email is required');
    } else if (!isValidEmail(email)) {
      errors.push('Email format is invalid');
    } else if (email.length > 100) {
      errors.push('Email cannot exceed 100 characters');
    }
  
    // If there are validation errors, return a bad request response
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors
      });
    }
  
    // If validation passes, move to the next middleware or route handler
    next();
  };
  
  // Helper function to validate email format using regex
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  // Validate ID parameter is a number
  const validateIdParam = (req, res, next) => {
    const id = parseInt(req.params.id);
    
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid ID parameter. ID must be a positive number.',
      });
    }
    
    // Store the parsed ID in request for later use
    req.userId = id;
    next();
  };
  
  module.exports = {
    validateUser,
    validateIdParam
  };