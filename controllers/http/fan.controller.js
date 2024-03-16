const catchAsyncErrors = require("../../middleware/catchAsyncErrors");
const {
    getFans,
    getFanCount,
    getIsFan,
    beFan,
    beUnFan,
} = require("../../services/fan.service");
const resHTTP = require("../../utils/resHTTP");

module.exports = {
    handleGetFans: catchAsyncErrors(async (req, res) => {
        const data = await getFans(req.params.celebrityUID, req.query);
        resHTTP("Fans", data, res, 200);
    }),
    handleGetFanCount: catchAsyncErrors(async (req, res) => {
        const data = await getFanCount(req.params.celebrityUID);
        resHTTP("Fan count", { count: data }, res, 200);
    }),
    handleGetIsFan: catchAsyncErrors(async (req, res) => {
        const data = await getIsFan(req.params.celebrityUID, req.params.fanUID);
        resHTTP("Is a fan ?", data, res, 200);
    }),
    handleBeFan: catchAsyncErrors(async (req, res) => {
        const data = await beFan(req.body.celebrityUID, req.body.fanUID);
        resHTTP("You were a fan", data, res, 201);
    }),
    handleBeUnFan: catchAsyncErrors(async (req, res) => {
        const data = await beUnFan(req.body.celebrityUID, req.body.fanUID);
        resHTTP("You were unfan now", data, res, 200);
    }),
};
