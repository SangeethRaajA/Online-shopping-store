const express = require("express");
const router = express.Router();
const { requireSignin, isAuth } = require("../controllers/auth");
const { userById } = require("../controllers/user");

const {
    createOrder
} = require("../controllers/order");

router.post("/cart/order", createOrder);

router.param("userId", userById);
module.exports = router;