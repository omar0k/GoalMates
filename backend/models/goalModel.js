const mongoose = require("mongoose");

const goalSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    text: {
      type: String,
      required: [true, "Please add a text value"],
    },
    dueDate: {
      type: Date,
      required: [true, "Please add a due date"],
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Goal", goalSchema);
