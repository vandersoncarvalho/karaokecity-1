const Command = require('../../structures/command')
module.exports = class clearCommand extends Command {
    constructor(client) {
        super(client, {
            name: "limpar",
            aliases: ['clear'],
            category: 'util'
        })
    }

    async run(message, args) {
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Você não tem permissão para executar este comando!").then(msg => msg.delete({ timeout: 5000 })).then(msg => msg.delete({ timeout: 5000 }))

        let amount = args.join(" ");
        if(!amount) return message.reply("Informe a quantidade de mensagens para serem apagadas.").then(msg => msg.delete({ timeout: 5000 }))
        if(amount > 100) return message.reply("Desculpe, digite um valor menor do que 100.").then(msg => msg.delete({ timeout: 5000 }))
        if(isNaN(amount)) return message.reply("Desculpe, o valor que você informou, não foi indetificado como um número.").then(msg => msg.delete({ timeout: 5000 }))

        try {
            await message.delete().catch();
            await message.channel.bulkDelete(amount, { filterOld: true}).then(msgs => {
                message.reply(`${msgs.size} mensagens apagadas com sucesso!`)
            })
        } catch (err) {
            console.error(err.stack)
        }
        
    }
}