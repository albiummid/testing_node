const { model, Schema } = require("mongoose");
const uuid = require("uuid").v4;

const modelName = "Transaction";
const collectionName = "transactions";
const fields = {
    provider: {
        type: String,
        ref: "User",
        required: true,
    },
    consumer: {
        type: String,
        ref: "User",
        required: true,
    },
    currency: {
        type: String,
        required: true,
        enums: ["Bean", "Diamond", "VIP Diamond"],
    },
    amount: {
        type: Number,
        default: 0,
        requried: true,
    },
    kind: {
        type: String,
        enums: ["General", "Vault"],
        required: true,
    },
    trx_id: {
        type: String,
        required: true,
        unique: true,
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
