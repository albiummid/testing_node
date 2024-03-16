const {
    handleDeviceHandshake,
} = require("../../../controllers/http/device.controller");

const router = require("express").Router();

// POST:: api/v1/auth/device/handshake
router.post("/handshake", handleDeviceHandshake);

module.exports = router;
