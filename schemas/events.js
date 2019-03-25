var mongoose = require("mongoose");

var Schema = mongoose.Schema;
module.exports   = new Schema({
    name : String,
    des : String,
    fulldes : String,
    data : String,
    time : String,
    top : String
});