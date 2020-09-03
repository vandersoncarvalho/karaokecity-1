const { MessageEmbed } = require('discord.js')
const Command = require('../../structures/command')

module.exports = class banComand extends Command {
    constructor(client) {
        super(client, {
            name: "ban",
            aliases: ['banir', 'punir'],
            category: 'mod'
        })
    }
    async run(message, args) {
        if(!message.member.hasPermission("BAN_MEMBERS")) return message.reply("Você não tem permissão para executar este comando!").then(msg => msg.delete({ timeout: 5000 }));

        const bUser = message.guild.member(message.mentions.members.first() || args[0]);
        if(!bUser) return message.reply(`Não foi possível encontrar o usuário!`).then(msg => msg.delete({ timeout: 5000 }));

        const reason = args.slice(1).join(" ");
        if(!reason) reason = "Não definido.";

        let authorRole = message.member.roles.highest;
        let bUserRole = bUser.roles.highest;

        if(authorRole.comparePositionTo(bUserRole) < 0) return message.reply("Você não pode banir este usuário, pois o cargo dele é maior do que o seu!").then(msg => msg.delete({ timeout: 5000 }))

        const confirmEmbed = new MessageEmbed()
        .setColor("#FF4500")
        .setTitle(`Deseja confirmar o banimento?`, true)
        .setThumbnail(bUser.user.displayAvatarURL())
        .addField("Punimento por", `<@${message.author.id}>`, true)
        .addField("Usuário punido", `${bUser}`, true)
        .addField("Motivo da punição", `${reason}`)
        .setFooter(this.client.user.username, this.client.user.displayAvatarURL())
        .setTimestamp();
        message.reply(confirmEmbed).then(async msg => {
            await msg.react('✅')
            await msg.react('🚫')

            const confirmFilter = (r, u) => r.emoji.name === '✅' && u.id === message.author.id;
            const cancelFilter = (r, u) => r.emoji.name ===  '🚫' && u.id === message.author.id;

            const confirm = msg.createReactionCollector(confirmFilter, { time: 60000 });
            const cancel = msg.createReactionCollector(cancelFilter, { time: 60000 })

            cancel.on('collect', r => {
                confirm.stop();
                r.users.remove(message.author);
                msg.delete();

                cancel.stop();
                return message.reply("Punição cancelada com sucesso!").then(msg => msg.delete({ timeout: 5000 }))
            })

            confirm.on('collect', async r => {
                const banEmbedDM = new MessageEmbed()
                .setColor("#FF4500")
                .setTitle(`Você foi banido!`, true)
                .setThumbnail(message.guild.iconURL())
                .addField("Motivo da punição:", reason, true)
                .setFooter(this.client.user.username, this.client.user.displayAvatarURL())
                .setTimestamp();

                const banEmbed = new MessageEmbed()
                .setColor("#FF4500")
                .setDescription("Usuário banido!")
                .setThumbnail(bUser.user.displayAvatarURL())
                .addField("Membro punido:", `${bUser}`, true)
                .addField("Punido por:", message.author, true)
                .addField("Motivo da punição:", reason, true)
                .setFooter(this.client.user.username, this.client.user.displayAvatarURL())
                .setTimestamp();

                const punchannel = message.guild.channels.cache.find(ch => ch.name === "punições-logs")
                if(!punchannel) {
                    message.reply("Não foi possível encontrar o canal de punições, desde então, estarei enviando a embed aqui.")
                    message.channel.send(banEmbed)
                }
                bUser.send(banEmbedDM)

                try {
                    msg.delete();
                    
                    await message.guild.members.ban(bUser, { reason: reason })
                    await message.reply(`O usuário foi banido com sucesso!`).then(msg => msg.delete({ timeout: 5000 }));

                    if(punchannel) {
                        punchannel.send(banEmbed)
                    }
                } catch (err) {
                    message.reply(`Não foi possível banir o usuário devido ao erro: ${err}`);
                }
            })
        })
    }
}