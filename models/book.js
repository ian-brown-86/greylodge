const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    body: { type: String, required: true },
    rating: {type: Number, min: 1, max: 5, default: 5}
}, { timestamps: true });

const bookSchema = new Schema({
    title: {type: String, required: true},
    author: {type: String, required: true},
    description: {type: String, required: true},
    img: {type: String, required: true},
    price: {type: Number, required: true},
    qty: {type: Number, required: true},
    reviews: [reviewSchema]
}, { timestamps: true }); 

module.exports = mongoose.model('Book', bookSchema);