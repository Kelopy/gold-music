const { CommandInteraction, Client, MessageEmbed } = require('discord.js');

module.exports = {
    name: "ping",
    description: "pong",
    /**
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
    execute(interaction, client){
        const ping = Math.round(client.ws.ping);
        const pingbed = new MessageEmbed()
        .setDescription(`Current latency: **${ping}ms**`)

        interaction.reply({embeds: [pingbed]});
    }
}   