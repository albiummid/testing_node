module.exports = {
    enumPusher: (obj) => [...Object.keys(obj).map((x) => x)],
    //
    terminationKinds: {
        Logout: "Logout",
        "Multiple SignIn": "Multiple SignIn",
        Tempering: "Tempering",
    },
    friendStatus: {},
};
