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
    .populate('createdEvents')
    .populate('joinedEvents')
    .populate('organizedEvents')
    .populate('favEvents')
    .populate('createdAlerts')
    .populate('favAlerts')
    .populate('favNGOs', 'title imageURL')
    .then(user => {
      res.json(user);
    })
    .catch(error => {
      res.json(error);
    });
});

// @route   PUT api/users/:id
// @desc    Update user profile
// @access  Private

router.put('/:id', (req, res) => {
  const userID = req.params.id;

  User.findByIdAndUpdate(userID, req.body, { new: true })
    .then(user => {
      res.json(user);
    })
    .catch(error => {
      res.json(error);
    });
});

// @route   POST api/users/upload
// @desc    Upload user profile picture
// @access  Private

router.post('/upload', uploadCloud.single('profilePicture'), (req, res, next) => {
  if (!req.file) {
    next(new Error('No file uplaoded!'));
    return;
  }
  res.json(req.file.secure_url);
});

// @route   DELETE api/users/:id
// @desc    Delete the user by ID
// @access  Private
router.delete('/:id', (req, res) => {
  const userID = req.params.id;

  User.findByIdAndDelete(userID)
    .then(() => {
      res.status(200).json({ message: `User ID ${userID} deleted` });
    })
    .catch(error => {
      res.json(error);
    });
});

module.exports = router;
