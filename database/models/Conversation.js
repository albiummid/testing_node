const { model, Schema } = require("mongoose");

const modelName = "Conversation";
const collectionName = "conversations";
const fields = {
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
