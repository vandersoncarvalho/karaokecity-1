const { MessageEmbed } = require('discord.js');
const Command = require('../../structures/command');

module.exports = class contatoCommand extends Command {
    constructor(client) {
        super(client, {
            name: "contato",
            aliases: [],
            category: 'util'
        })
    }

    async run(message) {

        const lettersUC = (text) => {
            return text
              .toLowerCase().split(' ').map(word => word.charAt(0)
              .toUpperCase() + word.slice(1)).join(' ');
          }

        const emoji = this.client.emojis.cache.get("749901745932730378") 
        const temoji = this.client.emojis.cache.get("749901841386569728") 
        const iemoji = this.client.emojis.cache.get("749901865252159568") 
        const yemoji = this.client.emojis.cache.get("749901929802498109") 
        const demoji = this.client.emojis.cache.get("749902131527680030")
        const embed = new MessageEmbed()
        .setColor("#FF4500")
        .setAuthor("Redes Sociais do servidor")
        .setThumbnail(this.client.user.displayAvatarURL())
        .setDescription(`${emoji} **WhatsApp:** [Clique aqui](https://chat.whatsapp.com/LostQHYM05yGpAbKnRyd9V)\n${iemoji} **Instagram:** [Clique aqui](https://instagram.com/karaokecity.br?igshid=ooc7r62qddmt)\n${yemoji} **YouTube:** [Clique aqui](https://www.youtube.com/channel/UCMs5i-NaKSO9XS0zG7givMw)\n${temoji} **Twitter:** [Clique aqui](https://twitter.com/kczinho?s=09)`)
        .addField(`Caso vocês queriam nos ajudar na divulgação do servidor, fiquem a vontade!` , `\n${demoji} **Discord:** https://discord.gg/karaokecity`)
        .setFooter(`Contato KaraokêCity`)
        .setTimestamp();
        message.channel.send(embed);
    }
}