const { model, Schema } = require("mongoose");

const modelName = "WalletDiamond";
const collectionName = "wallet_diamonds";
const fields = {
    owner: {
        type: String,
        ref: "User",
        required: true,
    },
    current_diamonds: {
        type: Number,
        default: 0,
        requried: true,
    },
    currnet_vip_diamonds: {
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
