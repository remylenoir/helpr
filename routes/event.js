const express = require("express");
const passport = require("passport");
const router = express.Router();
const Event = require('../models/Event');

//@route GET api/add
//@desc  create an event
//@access User

router.post('/add', (req, res) => {
  const { title, location, shortDesc, fullDesc, date, coverImage, categories, organizer, attendees, comments } = req.body
  Event.create({
    title,
    shortDesc,
    fullDesc,
    location,
    date,
    coverImage,
    categories,
    organizer,
    attendees,
    comments,
    creator: req.user._id
  }).then(response => {
    res.json(response)
  })
    .catch(err => {
      res.json(err)
    })
})



//@route GET api/getallevents
//@desc  get all events
//@access all events

router.get('/getall', (req, res) => {
  Event.find({})
    .then(events => {
      res.status(200).json(events)
    })
    .catch(err => {
      res.json(err)
    })
})




module.exports = router