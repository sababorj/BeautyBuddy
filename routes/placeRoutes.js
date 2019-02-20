const axios = require('axios')
module.exports = function (app) {

    app.post('/api/google/:zipcode', (req, res) => {
        let zip = req.params.zipcode;
        const placesApiKey = process.env.API_KEY;
        let geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:${zip}&key=${placesApiKey}`;
        const storeList = [];

        axios.get(geocodeUrl).then(async response => {
            let result = response.data.results[0];
            let lattitude = result.geometry.location.lat;
            let longitude = result.geometry.location.lng;
            console.log(`Lat: ${lattitude} | Long: ${longitude}`);

            function getStores(lal, long, key) {
                return new Promise((resolve, reject) => {
                    let placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lal},${long}&radius=15000&type=beauty_salon&key=${key}`;
                    axios.get(placesUrl).then(response => {
                        let storesNearby = (response.data.results);
                        // for loop through JSON response retrieve place info
                        for (let i = 0; i < storesNearby.length; i++) {
                            let store = {
                                name: storesNearby[i].name,
                                address: storesNearby[i].vicinity,
                                rating: storesNearby[i].rating
                            }
                            storeList.push(store);
                        };
                        resolve(storeList)
                    }).catch(error => reject(error));
                })
            }

            let storeData = await getStores(lattitude, longitude, placesApiKey);
            res.send(storeData);

        });
    })
}