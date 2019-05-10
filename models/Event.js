const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema(
  {
    title: { type: String, required: true },
    shortDesc: { type: String, required: true },
    fullDesc: { type: String, required: true },
    location: { type: String, required: true },
    date: {
      type: Date,
      default: Date.now,
      required: true
    },
    coverImage: String,
    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
      }
    ],
    organizer: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    attendees: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    comments: [
      {
        text: String,
        date: Date,
        author: {
          type: Schema.Types.ObjectId,
          ref: 'User'
        }
      }
    ]
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
