require('dotenv').config();
const db = require('../models');
var facepp = require('face-plusplus-node');

module.exports = function (app) {
    // Get image URL from database
    app.post('/api/face', (req, res) => {
        console.log(req.body.username)
        db.User.findOne({ username: req.body.username }, (err, data) => {
            res.json(data.image)
        })
    })

    // Facial Recognition API
    app.post('/api/faceAnalyze', (req, res) => {
        facepp.setApiKey(process.env.FACE_KEY);
        facepp.setApiSecret(process.env.FACE_SECRET);
        var parameters = {
            return_attributes: 'emotion',
            image_base64: req.body.image
        };
        console.log(parameters)

        facepp.post('/detect', parameters, function (err, res) {
            console.log(res);
        })
    });
}