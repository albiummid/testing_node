const {
    handleSendFriendRequest,

    handleAcceptFriendRequest,
    handleRejectFriendRequest,
    handleCancelFriendRequest,
    handleGetFriendshipStatus,
    handleGetFriendsCount,
    handleGetFriends,
    handleGetReceivedFriendRequestList,
    handleGetSendFriendRequestList,
    handleDoUnfriend,
} = require("../../../controllers/http/friend.controller");

const router = require("express").Router();

router.get("/count/:userId", handleGetFriendsCount);
router.get("/:userId/list", handleGetFriends);
router.get("/request-receive/:userId/list", handleGetReceivedFriendRequestList);
router.get("/request-send/:userId/list", handleGetSendFriendRequestList);
router.post("/request/send", handleSendFriendRequest);
router.post("/request/accept", handleAcceptFriendRequest);
router.post("/request/reject", handleRejectFriendRequest);
router.post("/request/cancel", handleCancelFriendRequest);
router.post("/unfriend", handleDoUnfriend);
router.post("/status", handleGetFriendshipStatus);

module.exports = router;
