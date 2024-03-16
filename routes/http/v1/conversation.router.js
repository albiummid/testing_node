const {
    handleGetConversations,
    handleGetConversationMessages,
    handleCreateConversation,
    handleDeleteConversation,
    handleDeleteConversationMessage,
    handleSendMessage,
    handleGetConversationByUIDs,
} = require("../../../controllers/http/conversation.controller");

const router = require("express").Router();

router.get("/user/:userId/list", handleGetConversations);
router.get(
    "/conversation-message/:conversationId/list",
    handleGetConversationMessages
);
router.get("/uids/:uid1/:uid2", handleGetConversationByUIDs);
router.post("/message/send", handleSendMessage);
router.post("/create", handleCreateConversation);
router.delete("/destroy/:conversationId", handleDeleteConversation);
router.delete(
    "/message/destory/:conversationMessageId",
    handleDeleteConversationMessage
);

module.exports = router;
