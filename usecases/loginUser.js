const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class LoginUser {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ username, password }) {
    const user = await this.userRepository.findByUsername(username);
    if (!user) {
      throw new Error("User not found.");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials.");
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET || "supersecretkey",
      { expiresIn: "1h" }
    );

    return { 
      user: {
      id: user.id,
      username: user.username,
      fullName: user.fullName,
      phoneNumber: user.phoneNumber,
      }, 
      token 
    };
  }
}

module.exports = LoginUser;
