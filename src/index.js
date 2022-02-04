require('dotenv').config();
const { Client, Collection, Intents } = require('discord.js')
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const { registerCmds, registerEvents } = require('./utils/registerHandler');

client.cmds = new Collection();
client.cooldowon = new Collection();

registerCmds('../handler/commands', client);
registerEvents('../handler/events', client);

client.login(process.env.TOKEN);