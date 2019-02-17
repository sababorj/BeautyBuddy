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
            return_attributes: 'gender',
            image_file: req.body.image.data
        };
        console.log("helloworld")
        console.log(parameters)

        facepp.post('/detect', parameters, function (err, res) {
            console.log(res);
            let faceInfo = {'image_file':req.body.image.data,'return_attributes':gender};
            console.log(faceInfo)
        })

        // let imageData = facepp.dataURItoBlob(req.body.image);
        // // / / According to the individual needs to fill in the parameters, here are all written, including age and gender, etc., see the official document for details
        // let attributes = 'gender';
        // // Upload the image and get the result
        // let dataDic = {'image_file':imageData,'return_landmark':2,'return_attributes':attributes};
        // // / / Call the interface to detect faces
        // facepp.detectFace(dataDic,success,failed);



    });
}