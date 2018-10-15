let Discord = require('discord.js');

export const getEmbed = (data, type) => {
    let results = data.results;
    let embed = '';
    switch (type) {
        case 'anime':
            embed = animeEmbed(results[0]);
            break;
        case 'manga':
            embed = mangaEmbed(results[0]);
            break;
        case 'character':
        case 'person':
            embed = peopleEmbed(results[0]);
            break;
        default :
            break;
    }
    return embed;
};

const animeEmbed = (data) => {
    let embed = new Discord.RichEmbed();
    embed.setTitle(data.title)
        .setThumbnail(data.image_url)
        .setDescription(data.synopsis)
        .addField('Type : ', data.type)
        .addField('Episodes : ', data.episodes)
        .addField('Status : ', data.status)
        .addField('Score : ', data.score)
        .setURL(data.url);
    return embed;
};

const mangaEmbed = (data) => {
    let embed = new Discord.RichEmbed();
    embed.setTitle(data.title)
        .setThumbnail(data.image_url)
        .setDescription(data.synopsis)
        .addField('Type : ', data.type)
        .addField('Chapters : ', data.chapters)
        .addField('Status : ', data.status)
        .addField('Score : ', data.score)
        .setURL(data.url);
    return embed;
};


const peopleEmbed = (data) => {
    let embed = new Discord.RichEmbed();
    embed.setTitle(data.name)
        .setThumbnail(data.image_url)
        .setURL(data.url);
    return embed;
};