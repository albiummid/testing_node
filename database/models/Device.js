const { model, Schema } = require("mongoose");

const modelName = "Device";
const collectionName = "devices";
const fields = {
    device_token: {
        type: String, // generated by the server
        required: true,
    },
    local_id: {
        type: String, // generated by the mobile app while installing the app
        required: true,
    },
    kind: {
        type: String,
        enum: ["Android", "iOS", "Web", "Other"],
        required: true,
        default: null,
    },
    source: {
        type: String,
        default: null,
    },
    details:{
        brand:{
            type:String,
        default:null
        },
        model:{
            type:String,
        default:null
        },
        unique_id:{
            type:String,
            default:null
        },
        build_id:{
            type:String,
            default:null
        },
        device_fingerprint:{
            type:String,
            default:null
        },

    },
    fid: {
        type: String,
        default: null,
    },
    fcm_token: {
        type: String,
        default: null,
    },
    app_set_id: {
        type: String,
        default: null,
    },
    advertisement_id: {
        type: String,
        default: null,
    },
    properties: {
        type: Object,
        default: null,
    },
    req: {
        type: String,
        ref: "Request",
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