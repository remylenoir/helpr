const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    title: { type: String, required },
    description: String,
    imageURL: String,
    events: [
      {
        type: Schema.Types.ObjectId,
        ref: "Event"
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

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
