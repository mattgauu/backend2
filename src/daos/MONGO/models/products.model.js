const { Schema, model } = require('mongoose')
const { type } = require('os')

const productSchema = new Schema({
    title: String,
    code: {
        type: String,
        unique: true,
        required: true
    },
    category: String,
    price: Number
})

const productModel = model('products', productSchema)

module.exports = {
    productModel
}