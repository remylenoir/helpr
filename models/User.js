const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      default: 'user',
      enum: ['user', 'admin']
    },
    firstName: { type: String, default: '' },
    lastName: { type: String, default: '' },
    profilePicture: { type: String, default: '' },
    createdEvents: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Event'
      }
    ],
    joinedEvents: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Event'
      }
    ],
    organizedEvents: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Event'
      }
    ],
    createdAlerts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Alert'
      }
    ],
    favEvents: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Event'
      }
    ],
    favAlerts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Alert'
      }
    ],
    favNGOs: [
      {
        type: Schema.Types.ObjectId,
        ref: 'NGO'
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

const User = mongoose.model('User', userSchema);
module.exports = User;
