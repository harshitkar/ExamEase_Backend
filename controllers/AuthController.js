class AuthController {
  constructor(signupUser, loginUser) {
    this.signupUser = signupUser;
    this.loginUser = loginUser;
  }

  async signup(req, res) {
    try {
      const { username, full_name, phone_number, password } = req.body;

      if (!username || !full_name || !phone_number || !password) {
        return res.status(400).json({ error: "All fields are required." });
      }

      const newUser = await this.signupUser.execute({ 
        username, 
        fullName: full_name,
        phoneNumber: phone_number,
        password 
      });

      res.status(201).json(newUser);
    } catch (error) {
      console.error("Signup Error:", error.message);
      res.status(400).json({ error: error.message });
    }
  }

  async login(req, res) {
    try {
      const { username, password } = req.body;
      const result = await this.loginUser.execute({ username, password });
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = AuthController;
