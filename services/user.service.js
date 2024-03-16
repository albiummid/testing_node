const User = require("../database/models/User");
const WalletBean = require("../database/models/WalletBean");
const WalletDiamond = require("../database/models/WalletDiamond");
const ErrorHandler = require("../utils/errorHandler");
const queryHelper = require("../utils/queryHelper");

async function createUser({
    auth_kind,
    auth_properties,
    dob,
    email,
    name,
    roles,
    territory,
    ...rest
}) {
    const user = await User.create({
        auth_kind,
        auth_properties,
        dob,
        email,
        name,
        roles,
        territory,
        ...rest,
    });

    await WalletBean.create({
        owner: user._id,
    });
    await WalletDiamond.create({
        owner: user._id,
    });

    return user;
}

async function findUserByUID(_id, enableErrorThrow = false) {
    const user = await User.findById(_id);
    if (!user && enableErrorThrow) {
        throw new ErrorHandler("User doesn't exit for this _id", 404);
    }
    return user;
}

async function updateBasicInformationOfUserByUID({
    _id,
    name,
    dob,
    gender,
    phone,
    address,
    photo,
}) {
    const user = await findUserByUID(_id, true);
    return await User.findByIdAndUpdate(
        user._id,
        {
            name,
            dob,
            gender,
            phone,
            address,
            photo,
        },
        { new: true, runValidators: true }
    );
}
const getUserList = async (query) => {
    return queryHelper(User, query);
};

module.exports = {
    createUser,
    findUserByUID,
    updateBasicInformationOfUserByUID,
    getUserList,
};
