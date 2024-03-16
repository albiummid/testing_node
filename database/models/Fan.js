const { model, Schema } = require("mongoose");

const modelName = "Fan";
const collectionName = "fans";
const fields = {
    fan: {
        type: "String",
        ref: "User",
        required: true,
    },
    celebrity: {
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
