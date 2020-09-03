const Command = require('../../structures/command');
const { MessageEmbed } = require('discord.js');

module.exports = class helpCommand extends Command {
    constructor(client) {
        super(client, {
            name: "register",
            aliases: ['registrar'],
            category: 'mod'
        })
    }
    
    async run(message, args) {
        
        if (!message.member.hasPermission("MANAGE_GUILD")) return message.reply("sem permissão!").then(msg => msg.delete({ timeout: 5000 }));
        if (!message.guild.me.hasPermission("MANAGE_ROLES")) return message.reply("Não tenho permissão de Gerenciar Cargos!").then(msg => msg.delete({ timeout: 5000 }))

        const member = message.guild.member(message.mentions.members.first()) || message.guild.members.cache.get(args[0])
        if (!member) return message.reply("Mencione um usuário!").then(msg => msg.delete({ timeout: 5000 }))

        if (args.length < 2) return message.reply("Mencione ao menos 1 cargo.").then(msg => msg.delete({ timeout: 5000 }))

        let rolesID = [];

        for (let i = 1; i < args.length; i++) {
            let roleID = args[i];
            roleID = roleID.split("<").join("").split("@").join("").split("&").join("").split(">").join("")

            let role = message.guild.roles.cache.get(roleID);
            if (role) {
                rolesID.push(role.id)
                
            }
        }

        try {

            let rolesName = '';
            for (let i = 0; i < rolesID.length; i++) {
                let r = message.guild.roles.cache.get(rolesID[i])
                rolesName += `${r.name}, `

                let authorHighestRole = message.member.roles.highest;
                if(authorHighestRole.comparePositionTo(r) < 0) return message.reply("Não foi possível registrar o usuário, pois alguns desses cargos mencionados, é maior do que o seu.").then(msg => msg.delete({ timeout: 5000 }))

            }

            await member.roles.add(rolesID)
            message.reply("Cargos adicionados com sucesso!").then(msg => msg.delete({ timeout: 5000 }));

            const emoji = this.client.emojis.cache.get("748913959209271356")
            const embed = new MessageEmbed()
            .setColor("#FF4500")
            .setAuthor(`${member.user.tag} foi registrado!`, "https://cdn.discordapp.com/attachments/748361942615457794/748922942100078693/556352393244049409.png")
            .setThumbnail(message.guild.iconURL())
            .setDescription(`**Usuário registrado:** ${member}\n**Moderador de registro:** ${message.author}\n**Servidor:** ${message.guild.name}\n`)
            .addField(`**Cargos recebidos:** `, `${rolesName}`)
            .setFooter('Sistema registro - KaraokêCity')

            let channel = message.guild.channels.cache.find(ch => ch.name === "registro-logs");
            if (!channel) return message.reply("Não foi possível encontrar o canal `registro-logs`**").then(msg => msg.delete({ timeout: 5000 }));
            await channel.send(embed)
            await member.send(embed)

        } catch (err) {
            console.error(err.stack)
        }
    }
}