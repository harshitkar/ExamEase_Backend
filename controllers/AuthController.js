class AuthController {
  constructor(signupUser, loginUser) {
    this.signupUser = signupUser;
    this.loginUser = loginUser;
  }

  async signup(req, res) {
    try {
      const { username, full_name, phone_number, password } = req.body;
      const result = await this.signupUser.execute({ username, full_name, phone_number, password });

      res.status(result.status).json(result);
    } catch (error) {
      const status = error.status || 500;
      res.status(status).json({ error: error.message || "Internal server error." });
    }
  }

  async login(req, res) {
    try {
      const { username, password } = req.body;
      const result = await this.loginUser.execute({ username, password });
      
      res.status(result.status).json(result);
    } catch (error) {
      const status = error.status || 500;
      res.status(status).json({ error: error.message || "Internal server error." });
    }
  }
}

module.exports = AuthController;
