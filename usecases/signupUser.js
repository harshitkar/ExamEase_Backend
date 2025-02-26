const bcrypt = require("bcrypt");

class SignupUser {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ username, fullName, phoneNumber, password }) {
    const existingUser = await this.userRepository.findByUsername(username);
    if (existingUser) {
      throw new Error("Username already taken.");
    }

    const existingPhone = await this.userRepository.findByPhoneNumber(phoneNumber);
    if (existingPhone) {
      throw new Error("Phone number already in use.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    return await this.userRepository.createUser({
      username,
      fullName,
      phoneNumber,
      password: hashedPassword,
    });
  }
}

module.exports = SignupUser;
