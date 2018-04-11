let axios = require('axios');
let xml2js = require('xml2js');
let Discord = require('discord.js');
let URL = 'https://myanimelist.net';

export default class MyAnimeListHandler {

    constructor(message) {
        let instance = axios.create({
            baseURL: URL + '/api',
            auth: {
                username: 'Kazunari59',
                password: 'zerperz6'
            }
        });
        let command = message.cleanContent.split(" ");
        command = command[0];
        let query = message.cleanContent.split(command + ' ');
        query = encodeURI(query[1].replace(' ', '+'));
        let self = this;
        instance.get(command + '/search.xml?q=' + query).then(function (response) {
            if (response.status === 200) {
                message.channel.send(self.getRichEmbed(response.data, command)).catch((error) => {
                    message.channel.send('Oops ! Something went wrong while executing your request ...');
                    console.log(error)
                });
            }
        }).catch(function (err) {
            message.channel.send('No results found !');
            console.log(err);
        });
    }

    getRichEmbed(data, command) {
        let parseString = xml2js.parseString;
        let embed=  new Discord.RichEmbed();
        let self = this;
        parseString(data, function (err, result) {
            let entry;
            if(command === '/anime') {
                entry = result.anime.entry[0];
                embed.setTitle(self.cleanBrackets(entry.title))
                    .setThumbnail(self.cleanBrackets(entry.image))
                    .addField('Type : ', self.cleanBrackets(entry.type))
                    .addField('Episodes : ', self.cleanBrackets(entry.episodes))
                    .addField('Status : ', self.cleanBrackets(entry.status))
                    .addField('Score : ', self.cleanBrackets(entry.score))
                    .setURL(URL + command + '/' + self.cleanBrackets(entry.id));
            } else if(command === '/manga') {
                let entry = result.manga.entry[0];
                embed.setTitle(self.cleanBrackets(entry.title))
                    .setThumbnail(self.cleanBrackets(entry.image))
                    .addField('Type : ', self.cleanBrackets(entry.type))
                    .addField('Chapters : ', self.cleanBrackets(entry.chapters))
                    .addField('Status : ', self.cleanBrackets(entry.status))
                    .addField('Score : ', self.cleanBrackets(entry.score))
                    .setURL(URL + command + '/' + self.cleanBrackets(entry.id));
            }
        });
        return embed;
    }

    cleanBrackets(text) {
        let string = text.toString();
        let cleanString =  string.split('[ \'');
        cleanString = cleanString[0].split('\' ]');
        return cleanString[0];
    }
}