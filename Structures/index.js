const Discord = require('discord.js');
const { TOKEN } = require('./config.json');
const client = new Discord.Client({intents: 32767});
const discordModals = require('discord-modals');
discordModals(client);

const { Collection } = require('discord.js');
const { promisify } = require("util");
const { glob } = require("glob");
const PG = promisify(glob);
const Ascii = require("ascii-table");

client.commands = new Collection();
client.buttons = new Collection();

const { DisTube } = require('distube');
const { SpotifyPlugin } = require('@distube/spotify');

client.distube = new DisTube(client, {
    emitNewSongOnly: true,
    leaveOnFinish: false,
    emitAddSongWhenCreatingQueue: false,
    plugins: [new SpotifyPlugin()]
});

module.exports = client;

["Events", "Commands", "Buttons"].forEach(handler => {
    require(`./Handlers/${handler}`)(client, PG, Ascii)
});

client.login(TOKEN);