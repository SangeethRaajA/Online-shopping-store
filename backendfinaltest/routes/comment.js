const express = require("express");
const router = express.Router();
const { requireSignin, isAuth } = require("../controllers/auth");
const { userById } = require("../controllers/user");

const {
    createComment
} = require("../controllers/comment");

router.post("/product/comment", createComment);

router.param("userId", userById);

module.exports = router;