const express = require('express');
const router = express.Router();

// Import the model
const User = require('../models/User');

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
  const userID = req.params.id;

  User.findById(userID)
    .populate({
      path: 'createdEvents',
      select: ['title', 'coverImage']
    })
    .populate({
      path: 'joinedEvents',
      select: ['title', 'coverImage']
    })
    .populate({
      path: 'organizedEvents',
      select: ['title', 'coverImage']
    })
    .populate({
      path: 'createdAlerts',
      select: ['title', 'imageURL']
    })
    .populate({
      path: 'favorites',
      populate: {
        path: 'events',
        select: ['title', 'coverImage']
      },
      populate: {
        path: 'alerts',
        select: ['title', 'imageURL']
      },
      populate: {
        path: 'ngos',
        select: ['title', 'imageURL']
      }
    })
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
  const userID = req.params.id;

  User.findByIdAndUpdate(userID, req.body)
    .then(user => {
      res.json(user);
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
