const Discord = module.require('discord.js');
const fs = require('fs');
let prefix = fs.readFileSync('./set/prefix.txt').toString();
module.exports = {
    name: 'ban',
    description: '[mod] Ban a user',
    execute(message) {
        if (message.member.hasPermission('KICK_MEMBERS')) {
            const member = message.mentions.members.first();
            if (!member) {
                return message.reply('You need to mention the member you want to ban him');
            }
            const modembed = new Discord.RichEmbed()
                .setTitle(`The command ${prefix}ban was used`)
                .setColor('RANDOM')
                .addField(`${message.author.tag} banned: \n`, `${member.user.tag}`, true)
            message.guild.channels.get('646672806033227797').send({
                embed: modembed
            });
            return member
                .ban()
                .then(() => message.reply(`${member.user.tag} was banned.`))
                .catch(error => message.reply('Sorry, an error occured.'));
        }
    },
};