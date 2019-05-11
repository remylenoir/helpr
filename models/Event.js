const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema(
  {
    title: { type: String, required: true },
    shortDesc: { type: String, required: true },
    fullDesc: { type: String, required: true },
    // location: { type: String, required: true },
    date: {
      type: Date,
      default: new Date(),
      required: true
    },
    location: { type: { type: String, default: 'Point' }, coordinates: [Number] },
    coverImage: { type: String, default: '' },
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
    isActive: {
      type: Boolean,
      default: true
    },
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
