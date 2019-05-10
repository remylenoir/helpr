const express = require('express');
const router = express.Router();

// Import the models
const NGO = require('../models/NGO');
const User = require('../models/User');

// @route   POST api/ngo/add
// @desc    Add an NGO
// @access  Private
router.post('/add', (req, res) => {
  const { title, description, location, imageURL, websiteURL, contactURL, categories } = req.body;

  NGO.create({
    title,
    description,
    location,
    imageURL,
    websiteURL,
    contactURL,
    categories
  })
    .then(ngo => {
      res.status(200).json(ngo);
    })
    .catch(error => {
      res.json(error);
    });
});

// @route   GET api/ngo/all
// @desc    Get all NGOs
// @access  Public
router.get('/all', (req, res) => {
  NGO.find({})
    .then(ngos => {
      res.status(200).json(ngos);
    })
    .catch(error => {
      res.json(error);
    });
});

// @route   GET api/ngo/:id
// @desc    Get a NGO by ID
// @access  Public
router.get('/:id', (req, res) => {
  const ngoID = req.params.id;

  NGO.findById(ngoID)
    .then(ngo => {
      res.status(200).json(ngo);
    })
    .catch(error => {
      res.json(error);
    });
});

// @route   PUT api/ngo/bookmark/:id
// @desc    Bookmark/unbookmark a NGO
// @access  Public
router.put('/bookmark/:id', (req, res) => {
  // User and Event IDs
  const { _id } = req.user;
  const favNGOs = req.params.id;

  User.findById({ _id })
    .then(user => {
      if (!user.favNGOs.includes(favNGOs)) {
        User.findOneAndUpdate(
          { _id },
          {
            $push: { favNGOs }
          },
          { new: true }
        )
          .then(user => {
            res.json(user);
          })
          .catch(err => {
            res.json(err);
          });
      } else {
        User.findOneAndUpdate(
          { _id },
          {
            $pull: { favNGOs }
          },
          { new: true }
        )
          .then(user => {
            res.json(user);
          })
          .catch(err => {
            res.json(err);
          });
      }
    })
    .catch(err => {
      res.json(err);
    });
});

// @route   PUT api/ngo/:id
// @desc    Update the NGO by ID
// @access  Private
router.put('/:id', (req, res) => {
  const ngoID = req.params.id;

  NGO.findByIdAndUpdate(ngoID, req.body)
    .then(ngo => {
      res.status(200).json(ngo);
    })
    .catch(error => {
      res.json(error);
    });
});

// @route   DELETE api/ngo/:id
// @desc    Delete the NGO by ID
// @access  Private
router.delete('/:id', (req, res) => {
  const ngoID = req.params.id;

  NGO.findOneAndDelete(ngoID)
    .then(() => {
      return res.status(200).json({ message: 'NGO deleted' });
    })
    .catch(error => {
      res.status(401).json(error);
    });
});

module.exports = router;
