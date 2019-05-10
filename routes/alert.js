const express = require('express');
const router = express.Router();

// Import the models
const Alert = require('../models/Alert');
const User = require('../models/User');

// @route   POST api/alerts/add
// @desc    Add an alert
// @access  Public
router.post('/add', (req, res) => {
  const { title, description, location, imageURL, type } = req.body;

  Alert.create({
    title,
    description,
    location,
    type,
    imageURL,
    creator: req.user._id
  })
    .then(alert => {
      User.findByIdAndUpdate(req.user._id, {
        $push: { createdAlerts: alert._id }
      })
        .then(creator => {
          res.json(creator);
        })
        .catch(error => {
          res.json(error);
        });
    })
    .catch(error => {
      res.json(error);
    });
});

// @route   GET api/alerts/all
// @desc    Get all the alerts
// @access  Public
router.get('/all', (req, res) => {
  Alert.find({})
    // .populate("creator")
    .then(alerts => {
      res.json(alerts);
    })
    .catch(error => {
      res.json(error);
    });
});

// @route   GET api/alerts/:id
// @desc    Get the alert by ID
// @access  Private
router.get('/:id', (req, res) => {
  Alert.findById(req.params.id)
    .populate('creator')
    .then(alert => {
      res.json(alert);
    })
    .catch(error => {
      res.json(error);
    });
});

// @route   PUT api/alerts/:id
// @desc    Update the alert by ID
// @access  Private
router.put('/:id', (req, res) => {
  Alert.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.json({ message: 'Alert update successful' });
    })
    .catch(error => {
      res.json(error);
    });
});

// @route   DELETE api/alerts/:id
// @desc    Delete the alert by ID
// @access  Private
router.delete('/:id', (req, res) => {
  Alert.findOneAndDelete(req.params.id)
    .then(() => {
      return res.status(200).json({ message: 'Alert deleted' });
    })
    .catch(error => {
      res.status(401).json(error);
    });
});

module.exports = router;
