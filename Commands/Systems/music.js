const { CommandInteraction, MessageEmbed } = require('discord.js');

module.exports = {
    name: "music",
    description: "complete music system",
    options: [
        {
            name: "play",
            description: "play a song",
            type: "SUB_COMMAND",
            options: [{ name: "query", description: "provide a name or url", type: "STRING", required: true }]
        },
        {
            name: "volume",
            description: "alter the volume",
            type: "SUB_COMMAND",
            options: [{ name: "percent", description: "10 = 10%", type: "NUMBER", required: true }]
        },
        {
            name: "loop",
            description: "repeat the queue/song",
            type: "SUB_COMMAND",
            options: [{ name: "mode", description: "select an option", type: "STRING", required: true, 
            choices: [
                {name: "off", value: "off"},
                {name: "song", value: "song"},
                {name: "queue", value: "queue"}
            ] }]
        },
        {
            name: "settings",
            description: "choose an option",
            type: "SUB_COMMAND",
            options: [{ name: "options", description: "select an option", type: "STRING", required: true,
            choices: [
                {name: "queue", value: "queue"},
                {name: "skip", value: "skip"},
                {name: "pause", value: "pause"},
                {name: "resume", value: "resume"},
                {name: "stop", value: "stop"}
            ] }]
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client){
        const { options, member, guild, channel } = interaction;
        const VoiceChannel = member.voice.channel;

        if(!VoiceChannel)
            return interaction.reply({content: "You must be in a voice channel to use this command", ephemeral: true});
            

        if(guild.me.voice.channelId && VoiceChannel.id !== guild.me.voice.channelId)
            return interaction.reply({content: `I'm already playing music in **<#${guild.me.voice.channelId}>**`, ephemeral: true});

        try {

            switch(options.getSubcommand()){

                case "play" : {
                    client.distube.play( VoiceChannel, options.getString("query"), {textChannel: channel, member: member });
                    return interaction.reply({content: "✅ Request Received"});
                }

                case "volume" : {
                    const Volume = options.getNumber("percent");

                    if(Volume > 100 || Volume < 1)
                    return interaction.reply({content: "You must specify a number between **1-100**"});

                    client.distube.setVolume(VoiceChannel, Volume);
                    return interaction.reply({content: `🔊 Volume has been set to \`${Volume}%\``});
                }

                case "loop" : {
                    const queue = await client.distube.getQueue(VoiceChannel);

                    if(!queue)
                    return interaction.reply({content: "⛔ There is no queue."});

                    switch(options.getString("mode")){

                        case "off" : {
                            mode = 0
                            queue.setRepeatMode(mode);
                            return interaction.reply({content: "🔁 Looping has been disabled."});
                        }
                        case "song" : {
                            mode = 1
                            queue.setRepeatMode(mode);
                            return interaction.reply({content: "🔁 **Song** is now being looped."});
                        }
                        case "queue" : {
                            mode = 2
                            queue.setRepeatMode(mode);
                            return interaction.reply({content: "🔁 **Queue** is now being looped."});
                        }
                        
                    }

                }

                case "settings" : {
                    const queue = await client.distube.getQueue(VoiceChannel);

                    if(!queue)
                    return interaction.reply({content: "⛔ There is no queue."});

                    switch(options.getString("options")){

                        case "queue" : {
                            return interaction.reply({embeds: [new MessageEmbed()
                            .setColor("AQUA")
                            .setDescription(`${queue.songs.map(
                                (song, id) => `\n**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``
                            )}`)
                        ]});
                        }
                        case "skip" : {
                            
                            try {
                                await queue.skip(VoiceChannel);
                                return interaction.reply({content: "⏭ Song has been skipped."});
                            } catch(error) {
                                console.log(error);
                            }

                        }
                        case "stop" : {
                            await queue.stop(VoiceChannel);
                            return interaction.reply({content: "⏹ Song has been stopped."});
                        }
                        case "pause" : {
                            await queue.pause(VoiceChannel);
                            return interaction.reply({content: "⏸ Song has been paused."});
                        }
                        case "resume" : {
                            await queue.resume(VoiceChannel);
                            return interaction.reply({content: "▶ Song has been resumed."});
                        }

                    }

                    return;
                }

            }

        } catch(error) {
            const errorEmbed = new MessageEmbed()
            .setColor("RED")
            .setDescription(`⛔ Alert ${error}`)
            return interaction.reply({embeds: [errorEmbed]});
        }

    }
}