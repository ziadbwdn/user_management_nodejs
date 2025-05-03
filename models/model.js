// model

const { pool } = require('../config/db-config');

class User {
  constructor(user) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.created_at = user.created_at;
    this.updated_at = user.updated_at;
  }

  // Find all users
  static async findAll() {
    try {
      const [rows] = await pool.query('SELECT * FROM users');
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Find user by ID
  static async findById(id) {
    try {
      const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
      if (rows.length === 0) {
        return null;
      }
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Find user by email
  static async findByEmail(email) {
    try {
      const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
      if (rows.length === 0) {
        return null;
      }
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Create a new user
  static async create(newUser) {
    try {
      const [result] = await pool.query(
        'INSERT INTO users (name, email) VALUES (?, ?)',
        [newUser.name, newUser.email]
      );
      
      const [user] = await pool.query('SELECT * FROM users WHERE id = ?', [result.insertId]);
      return user[0];
    } catch (error) {
      throw error;
    }
  }

  // Update an existing user
  static async update(id, userData) {
    try {
      await pool.query(
        'UPDATE users SET name = ?, email = ? WHERE id = ?',
        [userData.name, userData.email, id]
      );
      
      const [user] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
      if (user.length === 0) {
        return null;
      }
      return user[0];
    } catch (error) {
      throw error;
    }
  }

  // Delete a user
  static async remove(id) {
    try {
      const [user] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
      if (user.length === 0) {
        return null;
      }
      
      await pool.query('DELETE FROM users WHERE id = ?', [id]);
      return user[0];
    } catch (error) {
      throw error;
    }
  }
}

module.exports = User;