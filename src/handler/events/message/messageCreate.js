const { load } = require('js-yaml');
const { readFileSync } = require('fs');
const { join } = require('path');

module.exports = {
    name: 'messageCreate',
    run: (client, message) => {
        const { prefix, cooldown, roles } = load(readFileSync(join(__dirname, `../../../configs/guild_${message.guild.id}.yml`))),
              [cmd, ...args] = message.content.slice(prefix.length).trim().split(/\s+/);
              cmdGet = client.cmds.get(cmd);
        if(!message.content.startsWith(prefix) || !cmdGet) return;
        if(client.cooldowon.get(message.author.id)) return message.channel.send('You are on cooldown');
        if(roles[message.member.roles.cache.first().name] < cmdGet.permissions) return message.channel.send('You do not permissions')
        cmdGet.run(client, message, args)
        client.cooldowon.set(message.author.id, true);
        setTimeout(() => client.cooldowon.delete(message.author.id), cooldown * 1000);
    }
}