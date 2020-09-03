const Command = require('../../structures/command');
const { MessageEmbed } = require('discord.js')

module.exports = class chatoffCommand extends Command {
    constructor(client) {
        super(client, {
            name: "chat-off",
            aliases: ['chatoff', 'lock', 'trancar'],
            category: 'mod'
        })
    }
    async run(message, args) {
        if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.reply("Você não tem permissão para executar este comando!").then(msg => msg.delete({ timeout: 5000 }))
        const role = message.guild.roles.cache.find(r => r.name === "@everyone")
        
        try {
          message.channel.createOverwrite(role, {
              SEND_MESSAGES: false
          })
        } catch (err) {
          message.reply(`Ocorreu um erro: ${err}`)
        }

      
        const embed = new MessageEmbed()
        .setColor("#FF4500")
        .setDescription("🔒 | Canal trancado com sucesso!")
        .setFooter("Para destrancar rapidamente, aperte na reação.")
        .setTimestamp()
        message.channel.send(embed).then(async msg => {
          msg.react('🔓')
          
          let filter = (r, u) => u.id === message.author.id;
          let collector = msg.createReactionCollector(filter);
          
          collector.on("collect", async r => {
              r.users.remove(message.author);
                try {
                  await message.channel.createOverwrite(role, {
                          SEND_MESSAGES: true
                  });

                  await message.reply("canal destrancado com sucesso!")
                  collector.stop();

                } catch (err) {
                  message.reply(`Ocorreu um erro: ${err}`)
                }
            })
        })
    }
}