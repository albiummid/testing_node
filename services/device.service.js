const Device = require("../database/models/Device");
const uuid = require("uuid").v4;

const bindDevice = async ({
    req,
    details,
    advertisement_id,
    app_set_id,
    fcm_token,
    fid,
    kind,
    local_id,
    properties,
    source,
}) => {
    let device = await isAlreadyBindedDevice(local_id);
    if (!device) {
        device = await Device.create({
            req: req.info._id,
            advertisement_id,
            details,
            app_set_id,
            device_token: uuid(),
            fcm_token,
            fid,
            kind,
            local_id,
            properties,
            source,
        });
    }
    console.log(device);
    return device;
};

const isDeviceBinded = async (token) => {
    return (
        (await Device.findOne({
            device_token: token,
        })) !== null
    );
};
const isAlreadyBindedDevice = async (local_id) => {
    return await Device.findOne({
        local_id,
    });
};

const getDeviceByDeviceToken = async (device_token) => {
    return await Device.findOne({
        device_token,
    });
};

module.exports = {
    bindDevice,
    isDeviceBinded,
    isAlreadyBindedDevice,
    getDeviceByDeviceToken,
};
