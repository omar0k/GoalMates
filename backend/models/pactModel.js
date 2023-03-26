const mongoose = require("mongoose");

const pactSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  email: {
    type: String,
    required: [true, "Please enter email"],
  },
  name: {
    type: String,
    required: [true, "Please enter name"],
  },
});

module.exports = mongoose.model("Pact", pactSchema);
