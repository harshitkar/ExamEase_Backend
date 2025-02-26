class User {
    constructor({ id, username, fullName, phoneNumber, password, createdAt }) {
      this.id = id;
      this.username = username;
      this.fullName = fullName;
      this.phoneNumber = phoneNumber;
      this.password = password;
      this.createdAt = createdAt;
    }
  }
  
  module.exports = User;
  