const express = require('express');
const router = express.Router();

// Import the models
const Category = require('../models/Category');
const Event = require('../models/Event');

// @route   POST api/category/add
// @desc    Add a category
// @access  Private
router.post('/add', (req, res) => {
  const { title, description, imageURL } = req.body;

  Category.create({
    title,
    description,
    imageURL
  })
    .then(category => {
      res.status(200).json(category);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// @route   GET api/category/all
// @desc    Get all categories
// @access  Public
router.get('/all', (req, res) => {
  Category.find({})
    .then(categories => {
      res.status(200).json(categories);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// @route   GET api/category/:id
// @desc    Get a category
// @access  Public
router.get('/:id', (req, res) => {
  const categoryID = req.params.id;

  Category.findById(categoryID)
    .then(category => {
      res.status(200).json(category);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// @route   PUT api/category/:id
// @desc    Edit a category
// @access  Private
router.put('/:id', (req, res) => {
  const categoryID = req.params.id;

  Category.findOneAndUpdate(categoryID, req.body, { new: true })
    .then(category => {
      res.status(200).json(category);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// @route   DELETE api/category/:id
// @desc    Delete a category
// @access  Private
router.delete('/:id', (req, res) => {
  const categoryID = req.params.id;

  Category.findByIdAndDelete(categoryID)
    .then(() => {
      res.status(200).json({ message: `Category ID ${categoryID} and all references deleted` });
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
