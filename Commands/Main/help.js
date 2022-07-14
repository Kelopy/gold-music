const { CommandInteraction, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    name: "help",
    description: "Gold Music Help Menu",
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    execute(interaction){
        
		const buttons = new MessageActionRow()
			.addComponents(
                new MessageButton()
                .setLabel("GitHub")
                .setURL("https://github.com/Kelopy")
                .setStyle('LINK'),
                new MessageButton()
                .setCustomId("contact-dev")
                .setLabel("Contact Developer")
                .setStyle('PRIMARY')
			);

        const help = new MessageEmbed()
        .setColor("AQUA")
        .setAuthor({name: "Gold Music Help Menu", iconURL: "https://vignette.wikia.nocookie.net/slime-rancherr/images/0/0f/Gold_Slime.png/revision/latest?cb=20170710212538&path-prefix=pl"})
        .setDescription("Music Bot made by **Kelopy#4392**")
        .addFields(
            { name: "Getting Started", value: "use `/music play <song/url>` while in a voice channel to get started!" },
            { name: "Volume", value: "use `/music volume <volume>` to change the volume if it's too high for you!" },
            { name: "Settings", value: "`/music settings queue`\n`/music settings skip`\n`/music settings pause`\n`/music settings resume`\n`/music settings stop`" }
        )
        .setFooter({text: "Thank you for using Gold Music :D", iconURL: "https://vignette.wikia.nocookie.net/slime-rancherr/images/0/0f/Gold_Slime.png/revision/latest?cb=20170710212538&path-prefix=pl"})

        interaction.reply({embeds: [help], components: [buttons]});
    }
}