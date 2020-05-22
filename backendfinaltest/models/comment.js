const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const commentSchema = new mongoose.Schema(
    {
        comment: {
            type: String,
            trim: true,
            required: true          
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);
