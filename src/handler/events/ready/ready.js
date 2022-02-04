module.exports = {
    name: 'ready',
    run: (client) => {
        console.log(`Ready! ${client.user.tag}`)
    }
}