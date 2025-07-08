// Simple in-memory blacklist. For production, use Redis or a database.
const blacklist = new Set();

module.exports = {
    add: async (token) => {
        blacklist.add(token);
    },
    has: async (token) => {
        return blacklist.has(token);
    }
};