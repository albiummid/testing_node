const { model, Schema } = require("mongoose");

const modelName = "User";
const collectionName = "users";
const fields = {
    name: {
        type: String,
        required: true,
    },
    territory: {
        type: String,
        required: true,
        enums: ["Control Room", "Public App"],
        default: "Public App",
    },
    roles: {
        type: Array,
        required: true,
        enums: ["Viewer", "Broadcaster"],
        default: "Viewer",
    },
    auth_kind: {
        type: String,
        required: true,
        enums: ["Google", "Facebook"],
    },
    auth_properties: {
        type: Object,
        required: true,
    },
    email: {
        type: String,
        required: false,
    },
    phone: {
        type: String,
        required: false,
    },
    photo: {
        type: String,
        default: null,
    },
    address: {
        type: String,
        required: false,
    },
    gender: {
        type: String,
        required: false,
        enums: ["Male", "Female", "Other"],
    },
    dob: {
        type: Date,
        dafault: null,
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
