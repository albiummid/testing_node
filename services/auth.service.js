const { JWT_SECRET } = require("../app.config");
const AuthSession = require("../database/models/AuthSession");
const jwt = require("jsonwebtoken");
const User = require("../database/models/User");
const { terminationKinds } = require("../data/enums");
const ErrorHandler = require("../utils/errorHandler");
const { createUser } = require("./user.service");
const getSeesionStartLog = (req) => {
    return {
        at: Date.now(),
        ip:
            req.ip ||
            req.headers["x-forwarded-for"] ||
            req.connection.remoteAddress,
        user_agent: req.headers["user-agent"] ? req.headers["user-agent"] : "",
    };
};
const createSession = async ({ req, user_id }) => {
    await terminateLastSession({ req, user_id });
    const sessionToken = await getJWT({
        user_id,
        device_token: req.info.device_token,
    });

    return await AuthSession.create({
        session_token: sessionToken,
        device_token: req.info.device_token,
        user_id,
        start_log: getSeesionStartLog(req),
        req: req.info._id,
    });
};

const terminateLastSession = async ({ terminationKind, req, user_id }) => {
    const session = await AuthSession.findOne({
        user_id: String(user_id),
        "end_log.at": null,
    });

    if (session) {
        await AuthSession.findByIdAndUpdate(session._id, {
            end_log: {
                at: Date.now(),
                ip:
                    req.ip ||
                    req.headers["x-forwarded-for"] ||
                    req.connection.remoteAddress,
                user_agent: req.headers["user-agent"]
                    ? req.headers["user-agent"]
                    : "",
                kind: terminationKind,
                by: user_id,
                device_token: req.info.device_token,
            },
        });
    }
};

async function getJWT(payload) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "7 days" });
}

const signInWithGoogle = async ({ req, properties }) => {
    let user = await User.findOne({
        email: properties.email,
        auth_kind: "Google",
    });
    if (!user) {
        // NEW USER
        user = await createUser({
            auth_kind: "Google",
            auth_properties: properties,
            email: properties.email,
            name: properties.name,
            photo: properties.photo,
        });
        const session = await createSession({
            req,
            user_id: user._id,
        });
        return {
            access_token: session.session_token,
            user_id: session.user_id,
        };
    }
    // Existing User

    const session = await createSession({
        req,
        user_id: user._id,
    });
    return {
        access_token: session.session_token,
        user_id: session.user_id,
    };
};
const signInWithFacebook = async ({ req, properties }) => {
    let user = await User.findOne({
        email: properties.email,
        auth_kind: "Facebook",
    });
    if (!user) {
        // NEW USER
        user = await createUser({
            auth_kind: "Facebook",
            auth_properties: properties,
            email: properties.email,
            name: properties.name,
        });
        const session = await createSession({
            req,
            user_id: user._id,
        });
        return {
            access_token: session.session_token,
            user_id: session.user_id,
        };
    }
    // Existing User

    const session = await createSession({
        req,
        user_id: user._id,
    });
    return {
        access_token: session.session_token,
        user_id: session.user_id,
    };
};

const logoutUser = async ({ req }) => {
    const { user_id } = req.info;
    await terminateLastSession({
        terminationKind: terminationKinds.Logout,
        req,
        user_id,
    });
    return true;
};

const hasActiveSession = async (userId, sessionToken) => {
    // verify has active session
    return await AuthSession.findOne({
        session_token: sessionToken,
        user_id: String(userId),
        "end_log.at": null,
    });
};

const verifyAndDecodeJWT = (sessionToken) => {
    return jwt.verify(sessionToken, JWT_SECRET);
};

module.exports = {
    createSession,
    verifyAndDecodeJWT,
    signInWithFacebook,
    signInWithGoogle,
    logoutUser,
    hasActiveSession,
};
