const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const Event = require('../models/Event');

//@route POST api/category/add
//@desc  add a category
//@access admin

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

//@route GET api/category/all
//@desc  get all categories
//@access all

router.get('/all', (req, res) => {
  Category.find({})
    .then(categories => {
      res.status(200).json(categories);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

//@route GET api/category/:id
//@desc  get a category
//@access all

router.get('/:id', (req, res) => {
  Category.findById(req.params.id)
    .then(category => {
      res.status(200).json(category);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

//@route PUT api/category/:id
//@desc  edit a category
//@access admin

router.put('/:id', (req, res) => {
  Category.findOneAndUpdate(req.params.id, req.body, { new: true })
    .then(category => {
      res.status(200).json(category);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

//@route PUT api/category/:id
//@desc  delete a category
//@access admin

router.delete('/:id', (req, res) => {
  Category.findOneAndDelete(req.params.id)
    .then(() => {
      res.status(200).res.json({ message: 'Event deleted' });
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
