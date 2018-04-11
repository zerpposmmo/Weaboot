import MyAnimeListHandler from "./handlers/myAnimeListHandler";

const Discord = require('discord.js');
require('dotenv').config();

const client = new Discord.Client();

const token = process.env.TOKEN;

client.on('ready', () => {
    console.info('I am ready!');
});

client.on('message', async message => {
    if (message.content.startsWith('/anime') || message.content.startsWith('/manga')) {
        new MyAnimeListHandler(message);
    }
});

client.login(token);