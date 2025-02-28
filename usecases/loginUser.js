const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class LoginUser {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ username, password }) {
    const user = await this.userRepository.findByUsername(username);
    if (!user) {
      throw { status: 404, message: "User not found." };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw { status: 401, message: "Invalid credentials." };
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET || "supersecretkey",
      { expiresIn: "1h" }
    );

    return { 
      status: 200,
      user: {
        id: user.id,
        username: user.username,
        full_name: user.full_name,
        phone_number: user.phone_number,
      }, 
      token 
    };
  }
}

module.exports = LoginUser;
