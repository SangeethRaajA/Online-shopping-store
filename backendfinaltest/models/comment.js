const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
    {
        userName:{
            type: String,
            trim: true,
        },
        comment: {
            type: String,
            trim: true,
        },
        productId: {
            type: String,
        }            
    },
    { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);
