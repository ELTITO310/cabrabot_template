const { load } = require('js-yaml');
const { join } = require('path');
const { writeFile } = require('fs');
const axios = require('axios');

module.exports = {
    name: 'config',
    permissions: 4,
    run: async (client, message, args) => {
        if(args[0] === 'get') return message.channel.send({ content: 'Config on me:', files: [join(__dirname, `../../../configs/guild_${message.guild.id}.yml`)] });
        else if(args[0] === 'set') {
            if(!message.attachments.size || !(message.attachments.first().name.split('.')[1] === 'yml') && !(message.attachments.first().name.split('.')[1] === 'yaml')) return message.channel.send('Files not found or invalid file extension');
            try {
                const res = await axios.get(message.attachments.first().url),
                  doc = load(res.data);
                if(Object.values(doc).includes(null)) return message.channel.send('Invalid Syntaxis');
                writeFile(join(__dirname, '../../../configs', `guild_${message.guild.id}.yml`), Buffer.from(res.data).toString('utf-8'), (err) => {
                    if(err) return message.channel.send(`Error: \`\`\`${err.message}\`\`\``);
                    return message.channel.send('Config updated');
                });
            } catch(e) {
                message.channel.send(`Invalid Syntaxis: \`\`\`${e.message}\`\`\``);
            }
        } else return message.channel.send('Invalid arguments. Use `config get` or `config set`');
    }
}