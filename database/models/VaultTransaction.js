const { model, Schema } = require("mongoose");
const uuid = require("uuid").v4;

const modelName = "VaultTransaction";
const collectionName = "vault_transactions";
const fields = {
    vault_id: {
        type: String,
        ref: "Vault",
        required: true,
    },
    reference_transaction: {
        type: String,
        ref: "Transaction",
    },
    previous_balance: {
        type: Number,
        requried: true,
    },
    current_balance: {
        type: Number,
        requried: true,
    },
    kind: {
        type: String,
        requried: true,
        enums: ["Increment", "Decrement"],
    },
    note: {
        type: String,
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
