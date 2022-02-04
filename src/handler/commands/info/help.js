const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'help',
    permissions: 1,
    run: (client, message, args) => {
        const e = new MessageEmbed()
        .setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
        .setColor('RANDOM')
        .setDescription(`These are my commands \n\n > ${client.cmds.map(cmd => `\`${cmd.name}\``).join(' - ')}`)

        message.channel.send({ embeds: [e] })
    }
}