const Discord = module.require('discord.js');
const moment = require('moment');
const fs = require('fs');
let prefix = fs.readFileSync('./set/prefix.txt').toString();
module.exports = {
    name: 'userinfo',
    description: '[general] Displays your own or mentioned user info',
    execute(message) {
            let args = message.content.slice(10).split(' ');
            let user = message.mentions.users.first() || message.guild.members.get(args[0]) || message.author;
            let target = message.mentions.users.first() || message.author;
            fs.stat(`./specs/${user.id}.txt`, function(err, fileStat) {
                if (err) {
                    if (err.code == 'ENOENT') {
                        let member = message.guild.member(user);
                        let embed = new Discord.RichEmbed()
                            .setAuthor(user.username + '#' + user.discriminator, user.displayAvatarURL)
                            .setDescription(`${user}`)
                            .setColor(`RANDOM`)
                            .setThumbnail(`${target.displayAvatarURL}`)
                            .addField('Joined at:', `${moment.utc(member.joinedAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`, true)
                            .addField('Status:', user.presence.status, true)
                            .addField('Created at:', `${moment.utc(user.createdAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`, true)
                            .addField('Roles:', member.roles.map(r => `${r}`).join(' | '), true)
                            .addField('Specifications:\n', `User has not added their specifications.\nTo add your own specs use ${prefix}specs`)
                            .setFooter(`ID: ${user.id}`)
                            .setTimestamp();
                        message.channel.send({
                            embed: embed
                        });
                        return;
                    }
                } else {
                    openfile = fs.readFileSync(`./specs/${user.id}.txt`).toString();
                    let member = message.guild.member(user);
                    let embed = new Discord.RichEmbed()
                        .setAuthor(user.username + '#' + user.discriminator, user.displayAvatarURL)
                        .setDescription(`${user}`)
                        .setColor(`RANDOM`)
                        .setThumbnail(`${target.displayAvatarURL}`)
                        .addField('Joined at:', `${moment.utc(member.joinedAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`, true)
                        .addField('Status:', user.presence.status, true)
                        .addField('Created at:', `${moment.utc(user.createdAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`, true)
                        .addField('Roles:', member.roles.map(r => `${r}`).join(' | '), true)
                        .addField('Specifications:\n', `${openfile}`)
                        .setFooter(`ID: ${user.id}`)
                        .setTimestamp();
                    message.channel.send({
                        embed: embed
                    });
                    return;
                }
            });
    },
};