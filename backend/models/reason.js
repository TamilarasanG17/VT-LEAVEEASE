const mongoose = require("mongoose");

const reasonSchema = new mongoose.Schema({
  reason: {
    type: String,
    unique: true,
    required: true,
  },
  contentTemplate: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Reason", reasonSchema);
