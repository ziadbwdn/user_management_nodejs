// config file

const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

// Create a connection pool to the database
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'user_management',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Get a Promise-based interface to use async/await
const promisePool = pool.promise();

// Initialize database function
async function initializeDatabase() {
  try {
    // Create the users table if it doesn't exist
    await promisePool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    
    // Check if there are any users, if not add some default ones
    const [rows] = await promisePool.query('SELECT COUNT(*) as count FROM users');
    
    if (rows[0].count === 0) {
      await promisePool.query(`
        INSERT INTO users (name, email) VALUES 
        ('John Doe', 'john.doe@example.com'),
        ('Jane Smith', 'jane.smith@example.com')
      `);
      console.log('Default users added to database');
    }
    
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Database initialization failed:', error);
    throw error;
  }
}

// Initialize the database when the module is loaded
initializeDatabase();

module.exports = {
  pool: promisePool,
  initializeDatabase
};