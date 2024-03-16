const { model, Schema } = require("mongoose");

const modelName = "Friend";
const collectionName = "friends";
const fields = {
    status: {
        type: String,
        enums: ["Pending", "Accepted", "Rejected"],
        required: true,
    },
    request_sender: {
        type: String,
        ref: "User",
        required: true,
    },
    request_receiver: {
        type: String,
        ref: "User",
        required: true,
    },
    uid_pair: [
        {
            type: String,
            ref: "User",
            required: true,
        },
    ],
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
