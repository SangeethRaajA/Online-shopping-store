const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema= new Schema({
    productname:{type:String},
    description:{type:String},
    gender:{type:String},
    category:{type:String},
    size:{type:String},
    price:{type:Number},
    quantity:{type:Number},
})

const Product = mongoose.model('Product',productSchema);

module.exports = Product;

