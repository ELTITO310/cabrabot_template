const { join } = require('path');
const { readdirSync } = require('fs');

/**
 * @param {string} dir 
 * @param {string} client 
 */
const registerCmds = (dir, client) => {
    const folder = readdirSync(join(__dirname, dir));
    folder.forEach(f => {
        const categorys = readdirSync(join(__dirname, dir, f));
        categorys.forEach(file => {
            const cmd = require(join(__dirname, dir, f, file));
            client.cmds.set(cmd.name, cmd);
        })
    });
};

/**
 * @param {string} dir 
 * @param {string} client 
 */
const registerEvents = (dir, client) => {
    const folder = readdirSync(join(__dirname, dir));
    folder.forEach(f => {
        const events = readdirSync(join(__dirname, dir, f));
        events.forEach(file => {
            const event = require(join(__dirname, dir, f, file));
            client.on(event.name, (...args) => event.run(client, ...args));
        })
    });
};

module.exports = {
    registerCmds,
    registerEvents
}