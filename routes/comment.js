const express = require("express");
const router = express.Router();
const { requireSignin, isAuth } = require("../controllers/auth");
const { userById } = require("../controllers/user");
const { productById } = require("../controllers/product");

const {
    createComment,
    list
} = require("../controllers/comment");

router.post("/product/comment", createComment);

router.get("/list/comments/:productId", list);

router.param("userId", userById);
router.param("productId", productById);


module.exports = router;