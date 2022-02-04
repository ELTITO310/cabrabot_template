const { Client, Collection, Intents } = require('discord.js')
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const { registerCmds, registerEvents } = require('./utils/registerHandler');

client.cmds = new Collection();
client.cooldowon = new Collection();

registerCmds('../handler/commands', client);
registerEvents('../handler/events', client);

client.login('NzgzNDYzNDY5MjM1Njk5NzMy.X8bHNw.huFij0X3F7N7bC7-9b_coZXUc54')