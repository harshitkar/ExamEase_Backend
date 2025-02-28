const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class SignupUser {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ username, full_name, phone_number, password }) {
    const existingUser = await this.userRepository.findByUsername(username);
    if (existingUser) {
      throw { status: 409, message: "Username already taken." };
    }

    const existingPhone = await this.userRepository.findByPhoneNumber(phone_number);
    if (existingPhone) {
      throw { status: 409, message: "Phone number already in use." };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userRepository.createUser({
      username,
      full_name,
      phone_number,
      password: hashedPassword,
    });

    if (!user) {
      throw { status: 500, message: "Failed to create user." };
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

module.exports = SignupUser;
