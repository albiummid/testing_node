const {
    handleGetFanCount,
    handleGetFans,
    handleGetIsFan,
    handleBeFan,
    handleBeUnFan,
} = require("../../../controllers/http/fan.controller");

const router = require("express").Router();

router.get("/count/:celebrityUID", handleGetFanCount);
router.get("/list/:celebrityUID", handleGetFans);
router.get("/check-is-fan/:celebrityUID/:followerId", handleGetIsFan);
router.post("/be-fan", handleBeFan);
router.post("/be-unfan", handleBeUnFan);

module.exports = router;
