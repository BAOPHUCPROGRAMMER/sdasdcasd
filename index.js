const Discord = require('discord.js');
const fs = require('fs');
const config = require('./config/config.json')
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const client = new Discord.Client({
    intents: 32767,
});
module.exports = client;
client.config = config
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.categories = fs.readdirSync("./commands/");
client.cooldowns = new Discord.Collection();
client.db = db
client.delay = ms => new Promise(res => setTimeout(res, ms));
client.embedCollection = new Discord.Collection();
client.interactions = new Discord.Collection();
client.snipes = new Discord.Collection();
client.slashcommands = new Discord.Collection();
const res = fs.readdirSync('./handlers');
res.map(name => require(`./handlers/${name}`)(client));
process.on('unhandledRejection', err => {
    return console.log(err);
});
process.on('warning', (warning) => {
    return console.log(warning.stack);
});
client.login(config.bot.token)