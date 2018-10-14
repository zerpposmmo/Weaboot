import CommandHandler from "./handlers/commandHandler";

const Discord = require('discord.js');
require('dotenv').config();

const client = new Discord.Client();

const token = process.env.TOKEN;

client.on('ready', () => {
    console.info('I am ready!');
});

client.on('message', async message => {
    if(!message.author.bot && message.content.startsWith('/')) {
        console.log(message.cleanContent);
        new CommandHandler(message);
    }
});

client.login(token);