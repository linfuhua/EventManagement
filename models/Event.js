var mongoose = require("mongoose");
var eventSchema = require("../schemas/events");

module.exports = mongoose.model("Event",eventSchema);