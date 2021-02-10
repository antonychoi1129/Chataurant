const express = require('express');
const restaurantModel = require('./restaurant.js');
const app = express();

app.get('/restaurants', async (req, res) => {
  // const restaurants = await restaurantModel.find().limit(20);

  const point = [req.query.lat, req.query.lon]
  const near = req.query.near

  const resturants = await restaurantModel.find({
    loc: {
     $near: {
      $maxDistance: near,
      $geometry: {
       type: "Point",
       coordinates: point
      }
     }
    }
   })
  // await restaurantModel.aggregate(
  //   [
  //     {
  //       "$geoNear": {
  //         "near": {
  //           "type": "Point",
  //           "coordinates": [114.217102, 22.313308]
  //         },
  //         "distanceField": "distance",
  //         "spherical": true,
  //         "maxDistance": 10000
  //       }
  //     }
  //   ],
  //   function (err, results) {
  //     console.log(results)
  //     console.log(err)
  //   }
  // )
  try {
    res.send(resturants);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = app