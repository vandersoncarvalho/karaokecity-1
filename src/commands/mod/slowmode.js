const Command = require('../../structures/command')

module.exports = class banComand extends Command {
    constructor(client) {
        super(client, {
            name: "slowmode",
            aliases: ['modolento', 'modo-lento'],
            category: 'mod'
        })
    }
    async run(message, args) {
        if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.reply("você não tem permissão para executar este comando!").then(msg => msg.delete({ timeout: 5000 }))
        
        const time = args[0];
        if(!time) return message.reply("indique um tempo válido em segundos.").then(msg => msg.delete({ timeout: 5000 }));

        await message.channel.setRateLimitPerUser(time, 'Slowmode')
        await message.reply(`o modo-lento neste canal foi definido para ${time} segundos.`).then(msg => msg.delete({ timeout: 5000 }))
    }
}