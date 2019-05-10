const express = require('express');
const router = express.Router();

// Import the models
const User = require('../models/User');
const Alert = require('../models/Alert');

// @route   GET api/users/all
// @desc    Get all users
// @access  Private
router.get('/all', (req, res) => {
  User.find({})
    .then(users => {
      res.json(users);
    })
    .catch(error => {
      res.json(error);
    });
});

// @route   GET api/users/:id
// @desc    Get a user by ID
// @access  Private
router.get('/:id', (req, res) => {
  User.findById(req.params.id)
    .populate('createdAlerts', 'createdEvents', 'joinedEvents')
    .then(user => {
      res.json(user);
    })
    .catch(error => {
      res.json(error);
    });
});

// @route   PUT api/users/:id
// @desc    Update the user by ID
// @access  Private
router.put('/:id', (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.json({ message: 'User update successful' });
    })
    .catch(error => {
      res.json(error);
    });
});

// @route   DELETE api/users/:id
// @desc    Delete the user by ID
// @access  Private
router.delete('/:id', (req, res) => {
  const { _id } = req.user;
  User.findOneAndDelete({ _id })
    .then(() => {
      return res.status(200).json({ message: 'User deleted' });
    })
    .catch(error => {
      res.status(401).json(error);
    });
});

module.exports = router;
