import ApiHandler from "./apiHandler";

let Discord = require('discord.js');

export default class CommandHandler {

    constructor(message) {
        let split = message.cleanContent.split(' ');
        let command = split[0];
        let apiHandler = new ApiHandler(message);
        let embed = new Discord.RichEmbed();
        let query = '';
        switch (command) {
            case '/search':
                query = split[0] + ' ' + split[1] + ' ';
                let temp = message.cleanContent.split(query);
                query = query + '/?q=' + temp[1];
                query = query.replace(/ /g, '/');
                apiHandler.request(query);
                break;
            case '/schedule':
                break;
            case '/help':
                embed.setTitle('List of available commands :')
                    .addField('/anime', 'Search for an anime')
                    .addField('/manga', 'Search for a manga')
                    .addField('/schedule', 'See today\'s releases')
                    .addField('/help', '¯\\_(ツ)_/¯');
                message.channel.send(embed);
                break;
            default:
                embed.setTitle('Unknown command ' + command)
                    .setDescription('See available command with /help');
                message.channel.send(embed);
                break;
        }
    }
}