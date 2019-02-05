const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  username: { type: String},
  brand: { type: String, required: true },
  name: { type: String, required: true },
  product_type: { type: String, required: true },
  product_link: { type: String, required: true },
  image_link: { type: String, required: true },
  price: {type: Number, required: true},
  date: { type: Date, default: Date.now }
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;