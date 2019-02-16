const axios = require('axios');
module.exports = function(app) {
    app.post('/api/getItem', async (req, res) => {
        const productResult = [];
        const queryUrl = `http://makeup-api.herokuapp.com/api/v1/products.json?product_type=${req.body.category}`;
    
        try {
          response = await axios.get(queryUrl)
          console.log(response.data)
          for (let i = 0; i < response.data.length; i++) {
            productResult.push(response.data[i])
          }
          res.send(productResult);
        } catch (error) {
          console.log(error);
        }
      })
}