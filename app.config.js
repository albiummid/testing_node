const dotenv = require("dotenv");
const { getLocalServerIp } = require("./utils/helpers");
dotenv.config();
const NODE_ENV = process.env.NODE_ENV || "development";
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "@lb!##eNcRYpted##";

const schemaOptions = {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
    },
};

const isDevENV = NODE_ENV === "development";

const getENV = (prodValue, devValue) => {
    return isDevENV ? devValue : prodValue;
};
const domain = getENV("https://albiummid.server.dev", getLocalServerIp());

module.exports = {
    NODE_ENV,
    PORT,
    JWT_SECRET,
    wildRoutes: [
        "/auth/device/resolve",
        "/auth/device/handshake",
        "/check/status/generate-204",
    ],
    nonAuthenticatedRoutes: ["/auth/signIn/google", "/auth/signIn/facebook"],
    appName: "Digo_Live_SERVER",
    schemaOptions,
    database: {
        provider: "MongoDB",
        name: "digo_live_db",
        database_url: getENV(
            process.env.DATABASE_URL,
            "mongodb://127.0.0.1:27017/digo_live_db"
        ),
    },
    apiURI: `http://${domain}:${PORT}/api`,
    doc_url: `http://${domain}:${PORT}/api/doc`,
    api_check_url: `http://${domain}:${PORT}/api/v1/check/status/generate-204`,
};
