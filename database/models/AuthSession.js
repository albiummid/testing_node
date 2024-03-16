const { model, Schema } = require("mongoose");
const { enumPusher, terminationKinds } = require("../../data/enums");

const modelName = "AuthSession";
const collectionName = "auth_sessions";
const fields = {
    session_token: {
        type: String,
        required: true,
    },
    device_token: {
        type: String,
        required: true,
    },
    user_id: {
        type: String,
        ref: "User",
        required: true,
    },
    start_log: {
        at: {
            type: Date,
            required: true,
        },
        ip: {
            type: String,
            required: true,
        },
        user_agent: {
            type: String,
            required: true,
        },
    },
    end_log: {
        at: {
            type: Date,
            default: null,
        },
        kind: {
            type: String,
            enums: enumPusher(terminationKinds),
            default: null,
        },
        by: {
            type: String,
            ref: "User",
            default: null,
        },
        ip: {
            type: String,
            default: null,
        },
        device_token: {
            type: String,
            default: null,
        },
        user_agent: {
            type: String,
            default: null,
        },
    },
    req: {
        type: String,
        ref: "Request",
        required: true,
    },
};

// Wrap fields with mongoose schema class
const schema = new Schema(fields, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
    },
});

// exporting mongoose model
module.exports = model(modelName, schema, collectionName);
