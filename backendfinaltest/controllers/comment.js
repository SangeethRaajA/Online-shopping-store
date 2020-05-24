const Comment = require("../models/comment");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.commentById = (req, res, next, id) => {
    Comment.findById(id).exec((err, comment) => {
        if (err || !comment) {
            return res.status(400).json({
                error: "Comment does not exist"
            });
        }
        req.comment = comment;
        next();
    });
};

exports.getCommentById=(req,res)=>{
    Comment.findById(req.params.commentId)
        .then(comment=>res.json(comment))
        .catch(err=>res.status(400).json('Error'+ err));
}

exports.createComment = (req, res) => {
    const comment = new Comment(req.body);
    comment.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: "error"
            });
        }
        res.json({ data });
    });
};

exports.read = (req, res) => {
    return res.json(req.comment);
};

exports.update = (req, res) => {
    const comment = req.comment;
    comment.name = req.body.name;
    comment.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};

exports.remove = (req, res) => {
    const comment = req.comment;
    comment.remove((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({
            message: "Comment deleted"
        });
    });
};

exports.list = (req, res) => {
    Comment.find().exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};
