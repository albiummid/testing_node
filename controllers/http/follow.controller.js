const catchAsyncErrors = require("../../middleware/catchAsyncErrors");
const {
    getFollowers,
    getFollowerCount,
    getIsFollowing,
    doFollow,
    doUnFollow,
} = require("../../services/follow.service");
const resHTTP = require("../../utils/resHTTP");

module.exports = {
    handleGetFollowers: catchAsyncErrors(async (req, res) => {
        const data = await getFollowers(req.params.followeeId, req.query);
        resHTTP("Followers", data, res, 200);
    }),
    handleGetFollowerCount: catchAsyncErrors(async (req, res) => {
        const data = await getFollowerCount(req.params.followeeId);
        resHTTP("Follower count", { count: data }, res, 200);
    }),
    handleGetIsFollowing: catchAsyncErrors(async (req, res) => {
        const data = await getIsFollowing(
            req.params.followeeId,
            req.params.followerId
        );
        resHTTP("Is following ?", data, res, 200);
    }),
    handleDoFollow: catchAsyncErrors(async (req, res) => {
        const data = await doFollow(req.body.followeeId, req.body.followerId);
        resHTTP("Followed", data, res, 201);
    }),
    handleDoUnFollow: catchAsyncErrors(async (req, res) => {
        const data = await doUnFollow(req.body.followeeId, req.body.followerId);
        resHTTP("Unfollowed", data, res, 200);
    }),
};
