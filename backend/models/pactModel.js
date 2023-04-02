const mongoose = require("mongoose");

const pactSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Pact", pactSchema);
