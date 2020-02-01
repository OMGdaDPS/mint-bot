const Discord = require('discord.js');
const request = require(`request`);
const moment = require('moment');
const {
    askkey,
} = require('../config.json');
const fs = require('fs');
let prefix = fs.readFileSync('./set/prefix.txt').toString();
module.exports = {
    name: 'ask',
    description: '[general] Ask Ubuntu api',
    execute(message) {
        let baseurl = "https://api.stackexchange.com/2.2/search/advanced?pagesize=1&order=desc&sort=votes&q=";
        let q = message.content.slice(prefix.length + 4);
        let key = '&site=askubuntu&key=' + askkey;
        let url = baseurl + q + key;
        request(url, {
            gzip: true,
            json: true
        }, (error, response, body) => {
            if (body.items < 1) return message.reply("Page not found!");
            const embed = new Discord.RichEmbed()
                .setTitle(body.items[0].title)
                .setAuthor(body.items[0].owner.display_name, body.items[0].owner.profile_image)
                .setThumbnail('https://raw.githubusercontent.com/UtopicUnicorns/mint-bot/master/ask.png')
                .setURL(body.items[0].link)
                .setColor('RANDOM')
                .setDescription(`Created at: ${moment.utc(body.items[0].creation_date).format('dddd, MMMM Do YYYY, HH:mm:ss')}`)
                .addField(body.items[0].title + '\n', body.items[0].closed_reason)
                .addField('Link: ', body.items[0].link)
                .addField('Answers: ', body.items[0].answer_count)
                .addField('Views: ', body.items[0].view_count)
                .addField('Score: ', body.items[0].score)
                .setFooter('tags: ' + body.items[0].tags)
            message.channel.send({
                embed: embed
            });
        });

    }
};