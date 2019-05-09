const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      default: "user",
      enum: ["user", "creator", "organizer", "admin"]
    },
    firstName: { type: String, default: "" },
    lastName: { type: String, default: "" },
    profilePicture: { type: String, default: "" },
    createdEvents: [
      {
        type: Schema.Types.ObjectId,
        ref: "Event"
      }
    ],
    joinedEvents: [
      {
        type: Schema.Types.ObjectId,
        ref: "Event"
      }
    ],
    createdAlerts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Alert"
      }
    ],
    favorites: [
      {
        events: {
          type: Schema.Types.ObjectId,
          ref: "Event"
        },
        alerts: {
          type: Schema.Types.ObjectId,
          ref: "Alert"
        },
        ngos: {
          type: Schema.Types.ObjectId,
          ref: "NGO"
        }
      }
    ]
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
