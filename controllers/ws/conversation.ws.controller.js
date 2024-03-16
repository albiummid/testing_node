const ConversationMessage = require("../../database/models/ConversationMessage");
const eventNames = require("../../keys/eventNames");
const catchWSAsyncErrors = require("../../middleware/catchWSAsyncErrors");
const resWS = require("../../utils/resWS");

module.exports = {
    handleSendMessage: catchWSAsyncErrors(async ([payload, cb], req) => {
        const data = await sendMessage({
            content: payload.content,
            content_type: payload.content_type,
            conversation_id: payload.conversation_id,
            owner: payload.owner,
        });
        req.socket.emit("");
    }),
    handleSeenMessage: catchWSAsyncErrors(async ([payload, cb], req) => {
        const { _id } = payload;
        const message = await ConversationMessage.findById(_id);
        message.seen = true;
        message.seen_at = Date.now();
        await message.save();
        req.io.emit(eventNames.receiver_seen_message(message.conversation_id), {
            message,
        });
    }),
};
