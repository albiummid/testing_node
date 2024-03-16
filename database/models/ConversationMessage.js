const { model, Schema } = require("mongoose");

const modelName = "ConversationMessage";
const collectionName = "conversation_messages";
const fields = {
    conversation_id: {
        type: "String",
        required: true,
    },
    owner: {
        type: String,
        required: true,
        ref: "User",
    },
    content_type: {
        type: String,
        required: true,
        enums: ["text", "image"],
    },
    content: {
        type: String,
        required: true,
    },
    seen: {
        type: Boolean,
        requried: true,
        default: false,
    },
    seen_at: {
        type: Date,
        default: null,
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
