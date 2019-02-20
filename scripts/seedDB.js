const mongoose = require('mongoose');
const db = require('../models');

module.exports = function (app) {
    mongoose.connect(
        process.env.MONGODB_URI ||
        "mongodb://localhost:27017/appDB",
        { useNewUrlParser: true }
    );

    const namespaceSeed = [
        {
            id: "ns1",
            title: "Message",
            endpoint: "/message",
            rooms: ["Makeup Tips, Skincare, Haircare, Health and Wellness"]
        }
    ];

    const roomSeed = [
        {
            id: "rm1",
            room_title: "Makeup Tips",
            image: "https://via.placeholder.com/200",
            room_namespace: "Message",
            private_room: false,
            history: [{sender: "Beauty Buddy", Message: "This is the beginning of the rooms messaging"}]
        },
        {
            id: "rm2",
            room_title: "Skincare",
            image: "https://via.placeholder.com/200",
            room_namespace: "Message",
            private_room: false,
            history:[{sender: "Beauty Buddy", Message: "This is the beginning of the rooms messaging"}]
        },
        {
            id: "rm3",
            room_title: "Haircare",
            image: "https://via.placeholder.com/200",
            room_namespace: "Message",
            private_room: false,
            history: [{sender: "Beauty Buddy", Message: "This is the beginning of the rooms messaging"}]
        },
        {
            id: "rm4",
            room_title: "Health and Wellness",
            image: "https://via.placeholder.com/200",
            room_namespace: "Message",
            private_room: false,
            history: [{sender: "Beauty Buddy", Message: "This is the beginning of the rooms messaging"}]
        }
    ];

    db.Namespace
        .deleteMany({})
        .then(() => db.Namespace.collection.insertMany(namespaceSeed))
        .then(data => {
            console.log(data.result.n + "ns records inserted!");
            // process.exit(0);
        })
        .catch(err => {
            console.error(err);
            // process.exit(1);
        });

    db.Room
        .deleteMany({})
        .then(() => db.Room.collection.insertMany(roomSeed))
        .then(data => {
            console.log(data.result.n + "rm records inserted!");
            // process.exit(0);
        })
        .catch(err => {
            console.error(err);
            // process.exit(1);
        });

}