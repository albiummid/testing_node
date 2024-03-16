module.exports = {
    receive_conversation_message: (conversationId) =>
        `receive_conversation_message/${conversationId}`,
    receiver_seen_message: (conversationId) =>
        `receiver_seen_message/${conversationId}`,
    seen_message: () => "seen_message",
};
