import ApiHandler from "./apiHandler";

let Discord = require('discord.js');
const searchTypes = ['anime', 'manga', 'person', 'character'];

export default class CommandHandler {

    constructor(message) {
        let split = message.cleanContent.split(' ');
        let command = split[0];
        let apiHandler = new ApiHandler(message);
        let embed = new Discord.RichEmbed();
        switch (command) {
            case '/search':
                if(split.length < 3) {
                    embed.setTitle('Missing argument for command ' + command)
                        .setDescription('See command details with /help');
                    message.channel.send(embed);
                    break;
                }
                let type = split[1];
                if(searchTypes.indexOf(type) === -1) {
                    embed.setTitle('Unknown search type ' + type)
                        .setDescription('See command details with /help');
                    message.channel.send(embed);
                    break;
                }
                let argument = message.cleanContent.replace(command + ' ' + type + ' ', '').replace(/ /g, '%20');
                argument = '?q=' + argument;
                let query = command + '/' + type + '/' + argument;
                console.log(query);
                apiHandler.searchRequest(query, type);
                break;
            case '/schedule':
                break;
            case '/help':
                embed.setTitle('List of available commands :')
                    .addField('/search [type] [argument]', 'Search for an anime, manga, person or character')
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