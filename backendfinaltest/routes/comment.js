const express = require("express");
const router = express.Router();
const { requireSignin, isAuth, isUser } = require("../controllers/auth");
const { userById } = require("../controllers/user");
const { productById } = require("../controllers/product");

const {
    create,
    commentById,
    read,
    update,
    remove,
    list
} = require("../controllers/comment");

router.post("/product/:userId", requireSignin, isAuth, isUser, create);

router.get("/comment/:productId", read);

router.put(
    "/comment/:commentId/:userId",
    requireSignin,
    isAuth,
    isUser,
    update
);

router.delete(
    "/comment/:commentId/:userId",
    requireSignin,
    isAuth,
    isUser,
    remove
);

router.get("/comments", list);

router.param("userId", userById);
router.param("productId", productById);

module.exports = router;