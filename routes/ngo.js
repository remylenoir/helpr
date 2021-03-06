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
// router.put('/bookmark/:id', (req, res) => {
//   const { _id } = req.user;
//   const favNGOs = req.params.id;

//   User.findById({ _id })
//     .then(user => {
//       if (!user.favNGOs.includes(favNGOs)) {
//         User.findOneAndUpdate(
//           { _id },
//           {
//             $push: { favNGOs }
//           },
//           { new: true }
//         )
//           .then(() => {
//             res.status(200).json({ message: `NGO ID ${favNGOs} successfully bookmarked` });
//           })
//           .catch(err => {
//             res.json(err);
//           });
//       } else {
//         User.findOneAndUpdate(
//           { _id },
//           {
//             $pull: { favNGOs }
//           },
//           { new: true }
//         )
//           .then(() => {
//             res.status(200).json({ message: `NGO ID ${favNGOs} successfully unbookmarked` });
//           })
//           .catch(err => {
//             res.json(err);
//           });
//       }
//     })
//     .catch(err => {
//       res.json(err);
//     });
// });

// @route   PUT api/events/add/bookmark/:id
// @desc    Bookmark an event
// @access  Public
router.put('/add/bookmark/:id', (req, res) => {
  const { _id } = req.user;
  const favNGOs = req.params.id;

  User.findById({ _id })
    .then(user => {
      User.findByIdAndUpdate(
        _id,
        {
          $addToSet: { favNGOs }
        },
        { new: true }
      )
        .then(() => {
          res.status(200).json(favNGOs);
        })
        .catch(err => {
          res.json(err);
        });
    })
    .catch(err => {
      res.json(err);
    });
});

// @route   PUT api/events/remove/bookmark/:id
// @desc    Unbookmark an event
// @access  Public
router.put('/remove/bookmark/:id', (req, res) => {
  const { _id } = req.user;
  const favNGOs = req.params.id;

  User.findById({ _id })
    .then(user => {
      if (user.favNGOs.includes(favNGOs)) {
        User.findByIdAndUpdate(
          { _id },
          {
            $pull: { favNGOs }
          },
          { new: true }
        )
          .then(() => {
            res.status(200).json(favNGOs);
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

  NGO.findByIdAndUpdate(ngoID, req.body, { new: true })
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

  NGO.findByIdAndDelete(ngoID)
    .then(() => {
      User.updateMany(
        { favNGOs: ngoID },
        {
          $pull: {
            favNGOs: ngoID
          }
        }
      )
        .then(() => {
          res.status(200).json({ message: `NGO ID ${ngoID} and all users's references deleted` });
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
