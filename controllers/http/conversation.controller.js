const eventNames = require("../../keys/eventNames");
const catchAsyncErrors = require("../../middleware/catchAsyncErrors");
const {
    getConversationMessages,
    createConversation,
    deleteConveration,
    deleteConversationMessage,
    getUserConversations,
    sendMessage,
    getConversationByUIDs,
    getConversatioById,
} = require("../../services/conversation.service");
const resHTTP = require("../../utils/resHTTP");

module.exports = {
    handleSendMessage: catchAsyncErrors(async (req, res) => {
        const data = await sendMessage({
            content: req.body.content,
            content_type: req.body.content_type,
            conversation_id: req.body.conversation_id,
            owner: req.body.owner,
        });
        const conversation = await getConversatioById(data.conversation_id);
        io.emit(eventNames.receive_conversation_message(conversation._id), {
            message: data,
        });
        resHTTP("Message sent", data, res, 200);
    }),
    handleGetConversationMessages: catchAsyncErrors(async (req, res) => {
        const data = await getConversationMessages(
            req.params.conversationId,
            req.query
        );
        resHTTP("Conversation Message List", data, res, 200);
    }),
    handleGetConversationByUIDs: catchAsyncErrors(async (req, res) => {
        const data = await getConversationByUIDs(
            req.params.uid1,
            req.params.uid2
        );
        resHTTP("Conversation", data, res, 200);
    }),
    handleGetConversations: catchAsyncErrors(async (req, res) => {
        const data = await getUserConversations(req.params.userId, req.query);
        resHTTP("Conversation Message ", data, res, 200);
    }),
    handleCreateConversation: catchAsyncErrors(async (req, res) => {
        const data = await createConversation(req.body.uid1, req.body.uid2);
        resHTTP("conversation created", data, res, 201);
    }),
    handleDeleteConversation: catchAsyncErrors(async (req, res) => {
        const data = await deleteConveration(req.params.conversationId);
        resHTTP("conversation and messages are deleted", data, res, 200);
    }),
    handleDeleteConversationMessage: catchAsyncErrors(async (req, res) => {
        const data = await deleteConversationMessage(
            req.params.conversationMessageId
        );
        resHTTP("conversation message deleted", data, res, 200);
    }),
};
