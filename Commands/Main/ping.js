const { CommandInteraction } = require('discord.js');

module.exports = {
    name: "ping",
    description: "pong",
    /**
     * @param {CommandInteraction} interaction
     */
    execute(interaction){
        interaction.reply("pong");
    }
}