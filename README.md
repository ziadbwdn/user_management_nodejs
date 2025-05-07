# User Management API

A RESTful API for managing user data built with Node.js, Express, and MySQL.

## Overview

This application provides a structured backend API for user management operations. It follows modern architecture patterns including separation of concerns and layered architecture to ensure maintainability and scalability.

## Features

- **Complete CRUD operations** for user management
- **MySQL database** integration
- **Auto-initialization** of database tables and sample data
- **Error handling** with appropriate status codes
- **Input validation** for all operations
- **Structured response format** with consistent JSON structure
- **Layered architecture** (routes → controllers → services → models)

## Project Structure

```
user-management-api/
├── app.js                  # Application entry point
├── package.json            # Project dependencies and scripts
├── .env                    # Environment variables
├── config/                 # Configuration files
│   └── db.config.js        # Database connection configuration
├── models/                 # Data models
│   └── user.model.js       # User model with database operations
├── routes/                 # API routes
│   └── user.routes.js      # User-related routes
├── controllers/            # Request handlers
│   └── user.controller.js  # User controller functions
├── services/               # Business logic
│   └── user.service.js     # User-related business logic
├── middleware/             # Custom middleware
│   └── validation.middleware.js  # Request validation
└── utils/                  # Utility functions
    └── response.util.js    # API response formatting
```

## Prerequisites

- Node.js (v14+)
- MySQL (v5.7+)

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd user-management-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   - Create a `.env` file in the project root
   - Add the following variables:
     ```
     PORT=3000
     NODE_ENV=development
     DB_HOST=localhost
     DB_USER=root
     DB_PASSWORD=your_password
     DB_NAME=user_management
     ```

4. Set up the database:
   ```bash
   # Create the MySQL database
   mysql -u root -p
   CREATE DATABASE user_management;
   exit
   ```

5. Start the application:
   ```bash
   npm start
   ```
   For development with auto-reload:
   ```bash
   npm run dev
   ```

## API Endpoints

### Users

| Method | Endpoint        | Description                   | Request Body                   | Success Response                                |
|--------|-----------------|-------------------------------|--------------------------------|------------------------------------------------|
| GET    | /api/users      | Get all users                 | -                              | 200 OK - List of users                         |
| GET    | /api/users/:id  | Get user by ID                | -                              | 200 OK - User object                           |
| POST   | /api/users      | Create a new user             | `{name, email}`                | 201 Created - Created user object              |
| PUT    | /api/users/:id  | Update an existing user       | `{name, email}`                | 200 OK - Updated user object                   |
| DELETE | /api/users/:id  | Delete a user                 | -                              | 200 OK - Deleted user object                   |

## Request & Response Examples

### GET /api/users

Response:
```json
{
  "success": true,
  "message": "Users retrieved successfully",
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john.doe@example.com",
      "created_at": "2023-09-10T15:30:45.000Z",
      "updated_at": "2023-09-10T15:30:45.000Z"
    },
    {
      "id": 2,
      "name": "Jane Smith",
      "email": "jane.smith@example.com",
      "created_at": "2023-09-10T15:30:45.000Z",
      "updated_at": "2023-09-10T15:30:45.000Z"
    }
  ]
}
```

### POST /api/users

Request:
```json
{
  "name": "Alice Johnson",
  "email": "alice@example.com"
}
```

Response:
```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "id": 3,
    "name": "Alice Johnson",
    "email": "alice@example.com",
    "created_at": "2023-09-10T15:35:22.000Z",
    "updated_at": "2023-09-10T15:35:22.000Z"
  }
}
```

## Error Handling

The API uses standard HTTP status codes to indicate the success or failure of requests:

- `200 OK` - The request was successful
- `201 Created` - A resource was successfully created
- `400 Bad Request` - The request was invalid or cannot be served
- `404 Not Found` - The requested resource does not exist
- `409 Conflict` - The request conflicts with the current state of the server
- `500 Internal Server Error` - An error occurred on the server

Error response format:
```json
{
  "success": false,
  "message": "Error message",
  "errors": ["List of specific errors"] // Optional
}
```

## Validation

The API performs validation on all input data:

- **User Creation/Update**:
  - Name is required
  - Email is required and must be in valid format
  - Email must be unique

## Architecture Overview

The application follows a layered architecture pattern:

1. **Routes Layer** - Maps HTTP requests to controller functions
2. **Controllers Layer** - Handles HTTP requests and responses
3. **Services Layer** - Contains business logic
4. **Models Layer** - Represents data and handles database operations

This separation of concerns ensures:
- Code maintainability
- Testability
- Scalability
- Reusability

## Testing

### With Postman

1. Import the [Postman Collection](path-to-collection) (if available)
2. Or create new requests matching the API endpoints documentation

### Example Tests

- Get all users
- Get user by ID (valid and invalid IDs)
- Create user (valid and invalid data)
- Update user (valid and invalid data)
- Delete user

## Future Enhancements

- User authentication and authorization
- More comprehensive input validation
- Pagination for list endpoints
- API rate limiting
- Logging system
- Test suite with automated tests
- Documentation with Swagger/OpenAPI

## License

[MIT](LICENSE)

## Contact

For questions or feedback, please contact [Your Name](mailto:your.email@example.com).
