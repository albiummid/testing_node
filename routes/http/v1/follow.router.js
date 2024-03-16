const {
    handleGetFollowerCount,
    handleGetIsFollowing,
    handleDoFollow,
    handleDoUnFollow,
    handleGetFollowers,
} = require("../../../controllers/http/follow.controller");

const router = require("express").Router();

router.get("/count/:followeeId", handleGetFollowerCount);
router.get("/list/:followeeId", handleGetFollowers);
router.get("/check-is-following/:followeeId/:followerId", handleGetIsFollowing);
router.post("/do-follow", handleDoFollow);
router.post("/do-unfollow", handleDoUnFollow);

module.exports = router;
