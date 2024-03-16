const v1_router = require("express").Router();
const v2_router = require("express").Router();

// v1 Routes
v1_router.use("/auth/device", require("./http/v1/device.router"));
v1_router.use("/auth", require("./http/v1/auth.router"));
v1_router.use("/user", require("./http/v1/user.router"));
v1_router.use("/friend", require("./http/v1/friend.router"));
v1_router.use("/follow", require("./http/v1/follow.router"));
v1_router.use("/fan", require("./http/v1/fan.router"));
v1_router.use("/vault", require("./http/v1/vault.router"));
v1_router.use("/wallet", require("./http/v1/wallet.router"));
v1_router.use("/conversation", require("./http/v1/conversation.router"));
v1_router.use("/check", require("./http/v1/check.router"));

module.exports = {
    v1_router,
    v2_router,
};
