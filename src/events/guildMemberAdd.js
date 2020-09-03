const config = require('../config.json');
const { MessageEmbed } = require('discord.js')
module.exports = class guildMemberAddEvent {
    constructor(client) {
        this.client = client;
    }
    async run (member) {

      let guild = await this.client.guilds.cache.get("656510008665571336");
      let channel = await this.client.channels.cache.get("749853855864455270");
      if (guild != member.guild) {
        return console.log("Sem boas-vindas pra você! Sai daqui saco pela.");
       } else {
         const emoji = this.client.emojis.cache.get("750340341584101487")
      
          let embed = new MessageEmbed()
          .setColor("#FF4500")
          .setAuthor(member.user.tag, member.user.displayAvatarURL())
          .setTitle(` ${emoji} Boas-vindas `)
          .setDescription(`**${member.user}**, bem-vindo(a) ao servidor **${guild.name}**! Atualmente estamos com **${member.guild.memberCount} membros**, divirta-se conosco! :heart:\n\nPeço que leia as <#673257233248944208> para vivermos em harmonia e aproveitar o servidor da melhor forma.`)
          .setThumbnail(member.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
          .setFooter("Karaokê ENTRADA - Scar é linda.")
          .setTimestamp();
    
       await channel.send(embed);
       await member.send(embed)
      }
    };
  }

      