const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
        },
        address: {
            type: String,
            trim: true,
        },
        email: {
            type: String,
            trim: true,
        },
        price: {
            type: Number,
        }      
    },
    { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
