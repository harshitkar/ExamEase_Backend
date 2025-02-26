const express = require("express");
const AuthController = require("../controllers/AuthController");
const SignupUser = require("../usecases/signupUser");
const LoginUser = require("../usecases/loginUser");
const UserRepository = require("../repositories/userRepository");
const pool = require("../db/db");

const router = express.Router();

const userRepository = new UserRepository(pool);
const signupUser = new SignupUser(userRepository);
const loginUser = new LoginUser(userRepository);
const authController = new AuthController(signupUser, loginUser);

router.post("/signup", (req, res) => authController.signup(req, res));
router.post("/login", (req, res) => authController.login(req, res));

module.exports = router;
