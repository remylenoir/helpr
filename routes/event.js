const express = require('express');
const router = express.Router();

// Import the models
const Event = require('../models/Event');
const User = require('../models/User');

// @route   POST api/events/add
// @desc    Create an event
// @access  Public
router.post('/add', (req, res) => {
  const {
    title,
    location,
    shortDesc,
    fullDesc,
    date,
    coverImage,
    categories,
    organizer,
    attendees,
    comments
  } = req.body;

  // User ID (event's creator)
  const { _id } = req.user;

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
    creator: _id,
    attendees: _id
  })
    .then(event => {
      User.findOneAndUpdate(_id, {
        $push: { createdEvents: event._id, joinedEvents: event._id }
      })
        .then(user => {
          res.json(user);
        })
        .catch(err => {
          res.json(err);
        });
    })
    .catch(err => {
      res.json(err);
    });
});

// @route   GET api/events/all
// @desc    Get all events
// @access  Public
router.get('/all', (req, res) => {
  Event.find({})
    .then(events => {
      res.status(200).json(events);
    })
    .catch(err => {
      res.json(err);
    });
});

// @route   GET api/events/:id
// @desc    Get an event
// @access  Public
router.get('/:id', (req, res) => {
  Event.findById(req.params.id)
    .populate({
      path: 'creator',
      select: ['username', 'profilePicture']
    })
    .populate({
      path: 'attendees',
      select: ['username', 'profilePicture']
    })
    .populate({
      path: 'organizer',
      select: ['username', 'profilePicture']
    })
    .populate({
      path: 'categories',
      select: ['title']
    })
    .then(event => {
      res.status(200).json(event);
    })
    .catch(err => {
      res.json(err);
    });
});

// @route   PUT api/events/join/:id
// @desc    Join an event
// @access  Public
router.put('/join/:id', (req, res) => {
  // User and Event IDs
  const { _id } = req.user;
  const joinedEvent = req.params.id;

  Event.findById(joinedEvent)
    .populate({
      path: 'attendees',
      select: ['username', 'profilePicture']
    })
    .then(event => {
      User.findOneAndUpdate(
        { _id },
        {
          $addToSet: { joinedEvents: event._id }
          // addToSet: add a value to an array unless the value is already present
        },
        { new: true }
      )
        .then(user => {
          res.json(user);
        })
        .catch(err => {
          res.json(err);
        });
    })
    .catch(err => {
      res.json(err);
    });
});

// @route   PUT api/events/leave/:id
// @desc    Leave an event
// @access  Public
router.put('/leave/:id', (req, res) => {
  // User and Event IDs
  const { _id } = req.user;
  const joinedEvent = req.params.id;

  Event.findById(joinedEvent)
    .populate({
      path: 'attendees',
      select: ['username', 'profilePicture']
    })
    .then(event => {
      User.findOneAndUpdate(
        { _id },
        {
          $pull: { joinedEvents: event._id }
        },
        { new: true }
      )
        .then(user => {
          res.json(user);
        })
        .catch(err => {
          res.json(err);
        });
    })
    .catch(err => {
      res.json(err);
    });
});

// @route   PUT api/events/:id
// @desc    Edit an event
// @access  Private
router.put('/:id', (req, res) => {
  Event.findOneAndUpdate(req.params.id, req.body)
    .then(() => {
      res.status(200).json({ message: 'Updated!' });
    })
    .catch(err => {
      res.json(err);
    });
});

// @route   DELETE api/events/:id
// @desc    Delete an event
// @access  Private
router.delete('/:id', (req, res) => {
  Event.findOneAndDelete(req.params.id)
    .then(() => {
      res.status(200).res.json({ message: 'Event deleted' });
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
