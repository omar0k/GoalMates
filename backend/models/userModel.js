const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name."],
    },
    email: {
      type: String,
      required: [true, "Please add an email."],
      min: 3,
      max: 255,
      unique: true,
    },
    password: {
      type: String,
      min: 8,
      max: 255,
      requird: [true, "Please add a password."],
    },
    pact: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
