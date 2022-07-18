const { CommandInteraction } = require('discord.js');

module.exports = {
    name: "stop",
    description: "stop the music and leave",
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction 
     */
    execute(interaction, client){
        const { member } = interaction;
        const VoiceChannel = member.voice.channel;
        const queue = await client.distube.getQueue(VoiceChannel);

        if(!queue)
        return interaction.reply({content: "⛔ There is no queue."});

        await queue.stop(VoiceChannel);
        return interaction.reply({content: "⏹ Song has been stopped."});
    }
}
