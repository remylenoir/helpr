const express = require("express");
const passport = require("passport");
const router = express.Router();

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");

// Import the model
const User = require("../models/User");

// @route   POST api/users/signup
// @desc    User sign up
// @access  Private
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

      // Encryption of the password
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

// @route   POST api/users/login
// @desc    Log in the user
// @access  Private
router.post("/login", passport.authenticate("local"), (req, res) => {
  // triggered after successful authenticate()
  req.login(req.user, err => {
    if (err)
      return res.status(500).json({
        message: "Something went wrong in the authentication process"
      });
    return res.json(req.user);
  }),
    // triggered after failed authenticate()
    (error, req, res) => {
      return res.status(401).json(error);
    };
});

// @route   POST api/users/logout
// @desc    Log out the user
// @access  Private
router.post("/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  res.status(200).json({ message: "User successfully logged out" });
});

// @route   GET api/users/loggedin
// @desc    Check if the user is logged in
// @access  Private
router.get("/loggedin", (req, res) => {
  if (req.isAuthenticated()) return res.json(req.user);
  return res.json(null);
});

// @route   DELETE api/users/delete
// @desc    Delete the user
// @access  Private
router.delete("/delete", (req, res) => {
  const { _id } = req.user;
  User.findOneAndDelete({ _id })
    .then(() => {
      return res.status(200).json({ message: "User deleted" });
    })
    .catch(error => {
      res.status(401).json(error);
    });
});

module.exports = router;
