const { model, Schema } = require("mongoose");

const modelName = "WalletBean";
const collectionName = "wallet_beans";
const fields = {
    owner: {
        type: String,
        ref: "User",
        required: true,
    },
    current_beans: {
        type: Number,
        default: 0,
        requried: true,
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
