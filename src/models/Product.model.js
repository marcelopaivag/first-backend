const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: { type: String },
    description: { type: String },
    value: { type: Number },
    category: { type: mongoose.ObjectId, ref: 'Category' }
})

const Product = mongoose.model('Product', productSchema)
module.exports = Product