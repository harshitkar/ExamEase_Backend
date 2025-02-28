class User {
    constructor({ id, username, full_name, phone_number, password, created_at }) {
      this.id = id;
      this.username = username;
      this.full_name = full_name;
      this.phone_number = phone_number;
      this.password = password;
      this.created_at = created_at;
    }
  }
  
  module.exports = User;
  