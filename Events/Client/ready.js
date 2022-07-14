const { Client } = require('discord.js');

module.exports = {
    name: 'ready',
    once: true,

    /**
     * @param {Client} client
     */

    execute(client) {
        console.log("Gold Music is online.");
        client.user.setPresence({ activities: [{ name: 'Slime Rancher' }], status: 'dnd'});
    }
}