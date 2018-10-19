let Discord = require('discord.js');

export const getEmbed = (data, type) => {
    let embed = '';
    switch (type) {
        case 'anime':
            embed = animeEmbed(data.results[0]);
            break;
        case 'manga':
            embed = mangaEmbed(data.results[0]);
            break;
        case 'character':
        case 'person':
            embed = peopleEmbed(data.results[0]);
            break;
        case 'sunday':
        case 'monday':
        case 'tuesday':
        case 'wednesday':
        case 'thursday':
        case 'friday':
        case 'saturday':
            embed = scheduleEmbed(type, data[type]);
            break;
        default:
            break;
    }
    embed.setColor(5301186);
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

const scheduleEmbed = (day, data) => {
  let embed = new Discord.RichEmbed();
  embed.setTitle('Schedule for ' + day);
  data.forEach((element) => {
      embed.addField(element.title, element.url);
  });
  return embed;
};