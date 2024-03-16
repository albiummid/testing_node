const Follow = require("../database/models/Follow");
const ErrorHandler = require("../utils/errorHandler");
const queryHelper = require("../utils/queryHelper");
const getFollowers = async function (followeeId, query = {}) {
    return await queryHelper(Follow, { followee: followeeId, ...query });
};

const getFollowerCount = async function (followeeId) {
    return await Follow.countDocuments({ followee: followeeId });
};

const getIsFollowing = async function (followeeId, followerId) {
    return Boolean(
        await Follow.findOne({
            followee: followeeId,
            follower: followerId,
        })
    );
};

module.exports = {
    getFollowers,
    getFollowerCount,
    getIsFollowing,
    doFollow: async function (followeeId, followerId) {
        if ((await getIsFollowing(followeeId, followerId)).isFollowing) {
            throw new ErrorHandler("Already following", 400);
        }
        return await Follow.create({
            followee: followeeId,
            follower: followerId,
        });
    },
    doUnFollow: async function (followeeId, followerId) {
        const follow = await Follow.findOne({
            followee: followeeId,
            follower: followerId,
        });
        if (!follow) {
            throw new ErrorHandler("Not following", 400);
        }
        await Follow.findByIdAndDelete(follow._id);
    },
};
