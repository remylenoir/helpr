const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const alertSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: {
      type: { type: String, default: 'Point' },
      coordinates: [Number]
    },
    type: {
      type: String,
      enum: ['People in need', 'Places', 'Other'],
      required: true
    },
    imageURL: { type: String, default: '' },
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    comments: [
      {
        text: String,
        date: {
          type: Date,
          default: new Date()
        },
        author: {
          type: Object
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

const Alert = mongoose.model('Alert', alertSchema);
module.exports = Alert;
