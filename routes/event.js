const express = require("express");
const passport = require("passport");
const router = express.Router();
const Event = require('../models/Event');

//@route POST api/events/add
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

//@route GET api/events/all
//@desc  get all events
//@access all events

router.get('/all', (req, res) => {
  Event.find({})
    .then(events => {
      res.status(200).json(events)
    })
    .catch(err => {
      res.json(err)
    })
})


//@route GET api/events/:id
//@desc  get an event
//@access get one event

router.get('/:id', (req, res) => {
  Event.findById(req.params.id)
    .then(event => {
      res.status(200).json(event)
    })
    .catch(err => {
      res.json(err)
    })
})


//@route Put api/events/:id
//@desc  edit an event
//@access edit an event

// router.put('/:id',(req,res)=> {
//   Event.findOneAndUpdate(req.params.id, {

//   })
// })





module.exports = router