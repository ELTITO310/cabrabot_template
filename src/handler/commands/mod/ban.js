module.exports = {
    name: 'ban',
    permissions: 3,
    run: async (client, message, args) => {
        const mention = message.mentions.members.first();
        if(!mention || !args.slice(1).join(' ') || mention.user.id === message.author.id || mention.user.id === client.user.id) return message.channel.send(`How to use: ban @mention reason`)
        mention.ban({ reason: args.slice(1).join(' ') }).then(() => {
            message.channel.send('Success ban!');
        }).catch((e) => {
            message.channel.send(`Oh an error occurred: \`\`\`${e.message}\`\`\``);
        })
    }
}