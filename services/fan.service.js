const Fan = require("../database/models/Fan");
const ErrorHandler = require("../utils/errorHandler");
const queryHelper = require("../utils/queryHelper");

module.exports = {
    getFans: async function (celebrityUID, query = {}) {
        return await queryHelper(Fan, { celebrity: celebrityUID, ...query });
    },
    getFanCount: async function (celebrityUID) {
        return await Fan.countDocuments({ celebrity: celebrityUID });
    },
    getIsFan: async function (celebrityUID, fanUID) {
        return {
            isFan: Boolean(
                await Fan.findOne({
                    celebrity: celebrityUID,
                    fan: fanUID,
                })
            ),
        };
    },
    beFan: async function (celebrityUID, fanUID) {
        if ((await this.getIsFaning(celebrityUID, fanUID)).isFan) {
            throw new ErrorHandler("Already faning", 400);
        }
        return await Fan.create({
            fanee: celebrityUID,
            faner: fanUID,
        });
    },
    beUnFan: async function (celebrityUID, fanUID) {
        const fan = await Fan.findOne({
            celebrity: celebrityUID,
            fan: fanUID,
        });
        if (!fan) {
            throw new ErrorHandler("Not faning", 400);
        }
        await Fan.findByIdAndDelete(fan._id);
    },
};
