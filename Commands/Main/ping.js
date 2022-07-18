const { CommandInteraction } = require('discord.js');

module.exports = {
    name: "ping",
    description: "pong",
    /**
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
    execute(interaction, client){
        const ping = Math.round(client.ws.ping);
        interaction.reply({
            content: `**Latency**: \`${ping}ms\``, 
            ephemeral: true
        });
    }
}
