const Friend = require("../../database/models/Friend");
const catchAsyncErrors = require("../../middleware/catchAsyncErrors");
const {
    sendFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest,
    getFriendship,
    getFriendsCount,
    getFriendList,
    getFriendRequestList,
    getOwnFriendRequestedList,
    getFriendRequestSendList,
    getFriendRequestReceiveList,
    cancelFriendRequest,
    doUnfriend,
} = require("../../services/friend.service");
const queryHelper = require("../../utils/queryHelper");
const resHTTP = require("../../utils/resHTTP");

module.exports = {
    handleGetFriends: catchAsyncErrors(async (req, res) => {
        const data = await getFriendList(req.params.userId, req.query);
        resHTTP("Friend list", data, res, 200);
    }),
    handleGetSendFriendRequestList: catchAsyncErrors(async (req, res) => {
        const data = await getFriendRequestSendList(
            req.params.userId,
            req.query
        );

        resHTTP("Friend request list", data, res, 200);
    }),
    handleGetReceivedFriendRequestList: catchAsyncErrors(async (req, res) => {
        const data = await getFriendRequestReceiveList(
            req.params.userId,
            req.query
        );
        resHTTP("Friend list", data, res, 200);
    }),
    handleSendFriendRequest: catchAsyncErrors(async (req, res) => {
        const request = await sendFriendRequest(
            req.body.senderId,
            req.body.receiverId
        );
        resHTTP("Friend request sent", request, res, 201);
    }),
    handleAcceptFriendRequest: catchAsyncErrors(async (req, res) => {
        const request = await acceptFriendRequest(
            req.body.requestId,
            req.body.acceptorId
        );
        resHTTP("Friend request accepted", request, res, 201);
    }),
    handleRejectFriendRequest: catchAsyncErrors(async (req, res) => {
        const request = await rejectFriendRequest(
            req.body.requestId,
            req.body.acceptorId
        );
        resHTTP("Friend request rejected", request, res, 201);
    }),
    handleCancelFriendRequest: catchAsyncErrors(async (req, res) => {
        const request = await cancelFriendRequest(
            req.body.requestId,
            req.body.senderId
        );
        resHTTP("Friend request cancelled", request, res, 201);
    }),
    handleGetFriendshipStatus: catchAsyncErrors(async (req, res) => {
        const request = await getFriendship(req.body.uid1, req.body.uid2);
        resHTTP("Friendship status", request, res, 200);
    }),
    handleGetFriendsCount: catchAsyncErrors(async (req, res) => {
        const data = await getFriendsCount(req.params.userId);
        resHTTP("Friend count", { count: data }, res, 200);
    }),
    handleDoUnfriend: catchAsyncErrors(async (req, res) => {
        const data = await doUnfriend(req.body.uid1, req.body.uid2);
        resHTTP("Unfriend", data, res, 200);
    }),
};
