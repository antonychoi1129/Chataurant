const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RestaurantSchema = new Schema(
    {
        "Opening Hours Date": { type: [String], required: true },
        "Opening Hours Time": { type: [String], required: true },
        Telephone: String,
        loc: {
            type: {
                type: String, // Don't do `{ location: { type: String } }`
                enum: ['Point'], // 'location.type' must be 'Point'
                required: true
              },
              coordinates: {
                type: [Number],
                required: true
              }
        },
        name: String,
        address: String,
        cuisine: String,
    },
)
RestaurantSchema.index({ "loc": "2dsphere" });
module.exports = mongoose.model('data', RestaurantSchema, 'data')