const express = require('express');
const router = express.Router();
const uploadCloud = require('../config/cloudinary');

// Import the models
const Alert = require('../models/Alert');
const User = require('../models/User');

// @route   POST api/alerts/add
// @desc    Add an alert
// @access  Public
router.post('/add', (req, res) => {
  const { title, description, location, imageURL, type, comments } = req.body;
  const { _id } = req.user;

  Alert.create({
    title,
    description,
    location,
    type,
    imageURL,
    creator: _id,
    comments,
  })
    .then(alert => {
      User.findByIdAndUpdate(
        { _id },
        {
          $push: { createdAlerts: alert._id }
        },
        { new: true }
      )
        .then(creator => creator)
        .catch(error => {
          res.json(error);
        });
      res.status(200).json(alert);
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
    .populate('creator', 'username profilePicture')
    .then(alert => {
      res.json(alert);
    })
    .catch(error => {
      res.json(error);
    });
});

// @route   POST api/alerts/upload
// @desc    Upload alert image
// @access  Private

router.post('/upload', uploadCloud.single('imageURL'), (req, res, next) => {
  if (!req.file) {
    next(new Error('No file uplaoded!'));
    return;
  }
  res.json(req.file.secure_url);
});

// @route   PUT api/alerts/add/bookmark/:id
// @desc    Bookmark an alert
// @access  Public
router.put('/add/bookmark/:id', (req, res) => {
  const { _id } = req.user;
  const favAlerts = req.params.id;

  User.findById({ _id })
    .then(user => {
      User.findByIdAndUpdate(
        _id,
        {
          $addToSet: { favAlerts }
        },
        { new: true }
      )
        .then(() => {
          res.status(200).json(favAlerts);
        })
        .catch(err => {
          res.json(err);
        });
    })
    .catch(err => {
      res.json(err);
    });
});

// @route   PUT api/alerts/remove/bookmark/:id
// @desc    Unbookmark an alert
// @access  Public
router.put('/remove/bookmark/:id', (req, res) => {
  const { _id } = req.user;
  const favAlerts = req.params.id;

  User.findById({ _id })
    .then(user => {
      if (user.favAlerts.includes(favAlerts)) {
        User.findByIdAndUpdate(
          { _id },
          {
            $pull: { favAlerts }
          },
          { new: true }
        )
          .then(() => {
            res.status(200).json(favAlerts);
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

// @route   PUT api/alerts/:id
// @desc    Update the alert by ID
// @access  Private
router.put('/:id', (req, res) => {
  const alertID = req.params.id;

  Alert.findByIdAndUpdate(alertID, req.body, { new: true })
    .then(alert => {
      res.json(alert);
    })
    .catch(error => {
      res.json(error);
    });
});

// @route   DELETE api/alerts/:id
// @desc    Delete the alert by ID
// @access  Private
router.delete('/:id', (req, res) => {
  const alertID = req.params.id;

  Alert.findByIdAndDelete(alertID)
    .then(() => {
      User.updateMany(
        {
          $or: [{ favAlerts: alertID }, { createdAlerts: alertID }]
        },
        {
          $pull: {
            favAlerts: alertID,
            createdAlerts: alertID
          }
        }
      )
        .then(() => {
          res
            .status(200)
            .json({
              message: `Alert ID ${alertID} and all users's references deleted`
            });
        })
        .catch(err => {
          res.json(err);
        });
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
