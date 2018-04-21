class MemoryMembersDAO {
    constructor() {
        this.memory = [];
    }

    joinUser(userId, chatId, options) {
        this.memory.push({
            user: {
                id: userId,
                aliases: options.aliases,
            },
            chatId,
        });
    }

    getUsersByChat(chatId) {
        return this.memory
            .filter(x => x.chatId === chatId)
            .map(x => x.user);
    }
}

module.exports = MemoryMembersDAO;