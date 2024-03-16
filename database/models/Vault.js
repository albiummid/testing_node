const { model, Schema } = require("mongoose");

const modelName = "Vault";
const collectionName = "valuts";
const fields = {
    title: {
        type: String,
        required: true,
    },
    currency: {
        type: String,
        required: true,
        enums: ["Bean", "Diamond", "VIP Diamond"],
    },
    current_balance: {
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
