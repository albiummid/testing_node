const catchAsyncErrors = require("../../middleware/catchAsyncErrors");
const {
    findUserByUID,
    updateBasicInformationOfUserByUID,
    getUserList,
} = require("../../services/user.service");
const resHTTP = require("../../utils/resHTTP");

module.exports = {
    handleGetUserByUID: catchAsyncErrors(async (req, res) => {
        const user = await findUserByUID(req.params.id, true);
        resHTTP("User found", user, res, 200);
    }),
    handleUpdateUsersBasicInfo: catchAsyncErrors(async (req, res) => {
        const user = await updateBasicInformationOfUserByUID({
            _id: req.params.id,
            ...req.body,
        });
        resHTTP("User info updated", user, res, 200);
    }),
    handleGetUserList: catchAsyncErrors(async (req, res) => {
        const data = await getUserList(req.query);
        resHTTP("User found", data, res, 200);
    }),
};
