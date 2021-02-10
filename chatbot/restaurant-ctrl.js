
const express = require('express')

const RestaurantCtrl = require('./restaurant-ctrl')

const router = express.Router()

router.get('/restaurants', RestaurantCtrl.getRestaurants)

module.exports = router