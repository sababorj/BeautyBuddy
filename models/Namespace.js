const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const namespaceSchema = new Schema({
  id: { type: String},
  image: { type: String, required: true },
  title: { type: String, required: true },
  endpoint: { type: String, required: true },
  rooms: { type: [String], required: true },
});

const Namespace = mongoose.model("Namespace", namespaceSchema);

module.exports = Namespace;