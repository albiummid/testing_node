const Request = require("../database/models/Request");

const createRequest = async ({ req, device_token, user_id, kind }) => {
    return await Request.create({
        at: Date.now(),
        ip:
            req.ip ||
            req.headers["x-forwarded-for"] ||
            req.connection.remoteAddress,
        user_agent: req.headers["user-agent"] ? req.headers["user-agent"] : "",
        referer: req.headers["referer"] || req.headers["referrer"],
        device_token,
        kind,
        user_id,
    });
};

module.exports = {
    createRequest,
};
