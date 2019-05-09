const express = require("express");
const passport = require("passport");
const router = express.Router();

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");

// Import the model
const User = require("../models/User");

router.post("/signup", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(422).json({ message: "Please provide a username and a password" });
  }

  if (password.length < 8) {
    return res.status(422).json({ message: "The password needs to have 8 characters minimum" });
  }

  User.findOne({ username })
    .then(user => {
      if (user) return res.status(409).json({ message: "Username already taken" });

      const salt = bcrypt.genSaltSync();
      const hash = bcrypt.hashSync(password, salt);

      return User.create({
        username: username,
        password: hash
      });
    })
    .then(newUser => {
      req.login(newUser, () => {
        return res.status(200).json(newUser);
      });
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
