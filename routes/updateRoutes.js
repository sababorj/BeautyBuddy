const db = require('../models')
module.exports = function(app){
    // Update profile details
    app.post('/api/update', async (req, res) => {
        async function updateProfile(piece) {
          console.log(piece)
          try {
            let data = await db.User.findOneAndUpdate({ username: req.body.username }, { [piece]: req.body.data })
            res.json(data)
          } catch (error) {
            res.status(400).json(err)
          }
        }
        updateProfile(req.body.piece);
      })

      // Save Item
      app.post('/api/saveItem', (req, res) => {
        db.Item.create(req.body)
        .then(data => res.json(data))
        .catch(err => res.status(400).json(err))
      });

      // Get saved Items for the user
      app.post('/api/getSaved', async(req,res) => {
        const data = await db.Item.find({username: req.body.username})
        res.json(data)
      });

      app.post('/api/unsave', async(req,res) => {
        const response = await db.Item.findOneAndRemove({username: req.body.username},{name: req.body.name})
        console.log(response);
        res.json(response)
      })
}