const { CommandInteraction, MessageEmbed } = require('discord.js');

module.exports = {
    id: "contact-dev",
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    execute(interaction){

        const contact = new MessageEmbed()
        .setTitle("Contact Developer")
        .addFields(
            { name: "Discord", value: "Kelopy#4392" },
            { name: "Minecraft", value: "IGN: `Kelopy`" },
            { name: "GitHub", value: "__https://github.com/Kelopy__" }
        )

        interaction.reply({embeds: [contact], ephemeral: true});
    }
}