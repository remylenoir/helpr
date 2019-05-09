const express = require("express");
const router = express.Router();

// Import the model
const NGO = require("../models/NGO");

// @route   POST api/ngo/add
// @desc    Add an NGO
// @access  Private
router.post("/add", (req, res) => {
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
router.get("/all", (req, res) => {
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
router.get("/:id", (req, res) => {
  NGO.findById(req.params.id)
    .then(ngo => {
      res.status(200).json(ngo);
    })
    .catch(error => {
      res.json(error);
    });
});

// @route   PUT api/ngo/:id
// @desc    Update the NGO by ID
// @access  Private
router.put("/:id", (req, res) => {
  NGO.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.status(200).json({ message: "NGO update successful" });
    })
    .catch(error => {
      res.json(error);
    });
});

// @route   DELETE api/ngo/:id
// @desc    Delete the NGO by ID
// @access  Private
router.delete("/:id", (req, res) => {
  NGO.findOneAndDelete(req.params.id)
    .then(() => {
      return res.status(200).json({ message: "NGO deleted" });
    })
    .catch(error => {
      res.status(401).json(error);
    });
});

module.exports = router;
