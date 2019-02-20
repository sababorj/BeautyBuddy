const mongoose = require('mongoose');
const db = require('../models');

module.exports = function(app) {
mongoose.connect(
    process.env.MONGODB_URI ||
    "mongodb://localhost:27017/appDB"
);

const namespaceSeed = [
    {
        id: "ns1",
        title: "Message",
        endpoint: "/message",
        rooms: ["Makeup Tips, Skincare, Haircare, Health and Wellness"]
    }
];

db.Namespace
  .remove({})
  .then(() => db.Namespace.collection.insertMany(namespaceSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  })

}