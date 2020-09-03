const Client = require('./src/Client.js');
const { MessageEmbed } = require('discord.js');

const client = new Client({
    fetchAllMembers: true
});

require('dotenv').config();
client.loadCommands('./src/commands');
client.loadEvents('./src/events');
client.on("ready", () => {
    let activities = [
        `Meu prefixo é kc!`,
        `Siga minhas redes sociais!`,
        `${client.channels.cache.size} canais!`,
        `${client.users.cache.size} usuários!`
      ],
      i = 0;
    setInterval( () => client.user.setActivity(`${activities[i++ % activities.length]}`, {
          type: "WATCHING"
        }), 10000); 
    });
    
    
client.login(process.env.TOKEN);