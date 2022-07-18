const { CommandInteraction } = require('discord.js');

module.exports = {
    name: "play",
    description: "play a song or playlist",
    options: [
        {
            name: "query",
            description: "input the song name/link",
            type: "STRING",
            required: true
        }
    ],
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction 
     */
    execute(interaction, client){
        const { options, member, channel } = interaction;
        const VoiceChannel = member.voice.channel;

        client.distube.play( VoiceChannel, options.getString("query"), {textChannel: channel, member: member });
        return interaction.reply({content: "✅ Request Received"});
    }
}
