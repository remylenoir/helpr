const express = require('express');
const router = express.Router();
const uploadCloud = require('../config/cloudinary');

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

router.put('/:id', uploadCloud.single('photo'), (req, res) => {
  const userID = req.params.id;

  User.findByIdAndUpdate(userID, req.body, { new: true })
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
  const userID = req.params.id;

  User.findOneAndDelete(userID)
    .then(() => {
      res.status(200).json({ message: `User ID ${userID} deleted` });
    })
    .catch(error => {
      res.json(error);
    });
});

module.exports = router;
