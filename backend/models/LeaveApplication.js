const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema({
  fromName: String,
  className: String,
  schoolName: String,
  city: String,
  toDesignation: String,
  toName: String,
  toCity: String,
  subject:String,
  content: String,
  date: String,
  place: String,
});

module.exports = mongoose.model("LeaveApplication", leaveSchema);
