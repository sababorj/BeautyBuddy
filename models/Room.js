const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomSchema = new Schema({
  id: { type: String},
  room_title: { type: String, required: true },
  image: {type: String, required: true},
  room_namespace: { type: String, required: true },
  private_room: { type: Boolean, required: true },
  history: { type: [String], required: false},
});

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;