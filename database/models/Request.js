const { model, Schema } = require("mongoose");

const modelName = "Request";
const collectionName = "requests";
const fields = {
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
    device_token: {
        type: String,
        default: null,
        ref: "Device",
    },
    user_id: {
        type: String,
        default: null,
        ref: "User",
    },
    kind: {
        type: String,
        required: true,
        enums: ["Rest API", "Web Socket"],
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
