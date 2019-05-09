const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ngoSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    imageURL: { type: String, default: "", required: true },
    websiteLink: String,
    contactLink: String,
    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: "Category"
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

const NGO = mongoose.model("NGO", ngoSchema);
module.exports = NGO;
