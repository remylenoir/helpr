const express = require("express");
const passport = require("passport");
const router = express.Router();
const Event = require('../models/Event');
const User = require('../models/User')

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
  }).then(event => {
    User.findOneAndUpdate(req.user._id, {
      $push: { createdEvents: event._id }
    }).then(user => {
      res.json(user)
    })
      .catch(err => {
        res.json(err)
      })
  }).catch(err => {
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


//@route PUT api/events/:id
//@desc  edit an event
//@access creator, organizer

router.put('/:id', (req, res) => {
  Event.findOneAndUpdate(req.params.id, req.body)
    .then(() => {
      res.status(200).json({ message: 'Updated!' })
    })
    .catch(err => {
      res.json(err)
    })
})


//@route DELETE api/events/:id
//@desc  delete an event
//@access creator

router.delete('/:id', (req, res) => {
  Event.findOneAndDelete(req.params.id)
    .then(() => {
      res.status(200).res.json({ message: 'Event deleted' })
    })
    .catch(err => {
      res.json(err)
    })
})




module.exports = router