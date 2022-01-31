const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const fs = require('fs');
const yaml = require('js-yaml')
const { join } = require('path');
const axios = require('axios');

client.on('ready', () => {
    console.log(`I'am ready: ${client.user.tag}`)
});

client.on('messageCreate', async message => {
    const doc = yaml.load(fs.readFileSync(join(__dirname, 'configs', `guild_${message.guild.id}.yml`), 'utf8'));
    const [cmdname, ...cmdargs] = message.content.slice(doc.prefix.length).trim().split(/\s+/);
    if(!message.content.startsWith(doc.prefix)) return;
    if(cmdname === 'help') return message.channel.send('AYUDADO')
    if(cmdname === 'config') {
        if(cmdargs[0] === 'get' || cmdargs[0] === 'set') {
            if(cmdargs[0] === 'get') return message.channel.send({ content: 'Configurame: ' ,files: [join(__dirname, 'configs', `guild_${message.guild.id}.yml`)] })
            else {
                try {
                    const abc = message.attachments.toJSON()[0].url.split('/');
                    if(!(abc[abc.length - 1].toString().split('.')[1] === 'yml') && !(abc[abc.length - 1].toString().split('.')[1] === 'yaml')) return message.channel.send('La extencion del archivo adjunto no es compatible')
                    const res = await axios.get(message.attachments.toJSON()[0].url)
                    fs.writeFileSync(join(__dirname, 'configs', `guild_${message.guild.id}.yml`), Buffer.from(res.data).toString('utf-8'))
                    message.channel.send(`ID: ${message.attachments.toJSON()[0].id}`);
                } catch(e) {
                    message.channel.send('No enconte ningun archivo adjunto')
                }
            }
        } else return message.channel.send('WHAT?')
    }
})

client.on('guildCreate', (guild) => {
    fs.createReadStream(join(__dirname,"configs","base.yml")).pipe(fs.createWriteStream(join(__dirname,"configs",`guild_${guild.id}.yml`)));
});

client.login(process.env.TOKEN)