const User = require("../models/user");

class UserRepository {
  constructor(pool) {
    this.pool = pool;
  }

  async findByUsername(username) {
    const result = await this.pool.query(
      `SELECT id, username, full_name, phone_number, password FROM users WHERE username = $1`,
      [username]
    );
  
    if (result.rows.length === 0) return null;
  
    const row = result.rows[0];
  
    console.log(row);
  
    return new User({
      id: row.id,
      username: row.username,
      fullName: row.full_name,
      phoneNumber: row.phone_number,
      password: row.password
    });
  }

  async findByPhoneNumber(phoneNumber) {
    const result = await this.pool.query(
      `SELECT * FROM users WHERE phone_number = $1`,
      [phoneNumber]
    );

    if (result.rows.length === 0) return null;
    return new User(result.rows[0]);
  }

  async createUser({ username, fullName, phoneNumber, password }) {
    const result = await this.pool.query(
      `INSERT INTO users (username, full_name, phone_number, password) 
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [username, fullName, phoneNumber, password]
    );

    return new User(result.rows[0]);
  }
}

module.exports = UserRepository;
