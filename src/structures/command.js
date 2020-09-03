module.exports = class Command {
    constructor(client, options) {
        this.client = client;

        this.config = {
            name: options.name || null,
            aliases: options.aliases || [],
            category: options.category || "util",
            description: options.description || "indefinido",
            dev: options.dev || false
        }
    }
}