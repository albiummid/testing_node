const Conversation = require("../database/models/Conversation");
const ConversationMessage = require("../database/models/ConversationMessage");
const queryHelper = require("../utils/queryHelper");

const getUserConversations = async (userId, query) => {
    return await queryHelper(Conversation, {
        uid_pair: {
            $in: [userId],
        },
        ...query,
    });
};
const getConversationMessages = async (conversationId, query) => {
    return await queryHelper(ConversationMessage, {
        conversation_id: conversationId,
        ...query,
    });
};

const getConversationByUIDs = async (uid1, uid2) => {
    return await Conversation.findOne(
        {
            uid_pair: {
                $in: [uid1, uid2],
            },
        },
        null,
        {
            populate: ["uid_pair"],
        }
    );
};

const createConversation = async (uid1, uid2) => {
    return await Conversation.create({
        uid_pair: [uid1, uid2],
    });
};

const sendMessage = async ({
    content,
    content_type,
    conversation_id,
    owner,
}) => {
    return await ConversationMessage.create({
        content,
        content_type,
        conversation_id,
        owner,
    });
};

const deleteConveration = async (conversationId) => {
    const messages = await ConversationMessage.find({
        conversation_id: conversationId,
    });
    for (let message of messages) {
        await deleteConversationMessage(message._id);
    }

    const deleted = await Conversation.findByIdAndDelete(conversationId);

    return {
        deleted: Boolean(deleted),
    };
};

const deleteConversationMessage = async (cmId) => {
    const message = await ConversationMessage.findById(cmId);
    if (message.content_type == "image") {
        // handle image deleting functionality of contentDB
    }
    const deleted = await ConversationMessage.findByIdAndDelete(cmId);

    return {
        deleted: Boolean(deleted),
    };
};

const getConversatioById = async (id) => {
    return await Conversation.findById(id, null, {
        populate: ["uid_pair"],
    });
};

module.exports = {
    deleteConveration,
    deleteConversationMessage,
    deleteConveration,
    sendMessage,
    createConversation,
    getUserConversations,
    getConversationMessages,
    getConversationByUIDs,
    getConversatioById,
};
