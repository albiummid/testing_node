const { model, Schema } = require("mongoose");

const modelName = "Friend";
const collectionName = "friends";
const fields = {
    timeperiod: {
        type: String,
        enums: ["Permanent", "Durational"],
        required: true,
    },
    expire_after: {
        type: String,
        enums: [
            "1hr",
            "4hr",
            "6hr",
            "12hr",
            "1d",
            "4d",
            "15d",
            "1month",
            "Never",
        ],
        required: true,
    },
    kind: {
        type: String,
        enums: ["Message", "Friend", "Content", "Call", "Broadcast"],
        required: true,
    },
    from: {
        type: String,
        ref: "User",
        required: true,
    },
    to: {
        type: String,
        ref: "User",
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
