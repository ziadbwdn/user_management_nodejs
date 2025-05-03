// response utils
// utils/response.util.js - Utility functions for API responses

// Standard success response
const successResponse = (res, data, message = 'Operation successful', statusCode = 200) => {
    return res.status(statusCode).json({
      success: true,
      message,
      data
    });
  };
  
  // Error response
  const errorResponse = (res, message = 'An error occurred', statusCode = 500, errors = null) => {
    const response = {
      success: false,
      message
    };
    
    // Add errors array if provided
    if (errors) {
      response.errors = errors;
    }
    
    return res.status(statusCode).json(response);
  };
  
  // Not found response
  const notFoundResponse = (res, message = 'Resource not found') => {
    return errorResponse(res, message, 404);
  };
  
  // Bad request response
  const badRequestResponse = (res, message = 'Bad request', errors = null) => {
    return errorResponse(res, message, 400, errors);
  };
  
  module.exports = {
    successResponse,
    errorResponse,
    notFoundResponse,
    badRequestResponse
  };