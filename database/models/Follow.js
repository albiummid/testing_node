const { model, Schema } = require("mongoose");

const modelName = "Follow";
const collectionName = "follows";
const fields = {
    followee: {
        type: "String",
        ref: "User",
        required: true,
    },
    follower: {
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
