const Discord = module.require('discord.js');
const fs = require('fs')
let prefix = fs.readFileSync('./set/prefix.txt').toString();
module.exports = {
    name: 'help',
    description: '[general] Displays all available commands',
    execute(message) {
        if (message.content === `${prefix}help admin`) {
            if (message.member.hasPermission('KICK_MEMBERS')) {
                let str = '';
                const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
                for (const file of commandFiles) {
                    const command = require(`./${file}`);
                    if (command.description.includes(`[admin]`))
                    str += `${prefix}${command.name}, ${command.description} \n`;
                }
                let embed = new Discord.RichEmbed()
                .setColor(`RANDOM`)
                .setThumbnail('https://cdn.discordapp.com/icons/628978428019736619/33f4cf09c0a0ee96c87d89bfd677e39a.png')
                .setDescription(`${str}\n${prefix}add, Give a user X points or take them\n${prefix}restart, well restart the bot\n${prefix}channel, Display sentient channelname\n${prefix}set, Set sentient channel ID\n${prefix}join, simulate a guildmemberjoin`)
                .setTimestamp();
                return message.channel.send({
                    embed: embed
                });
            }
        }
        if (message.content === `${prefix}help mod`) {
            if (message.member.hasPermission('KICK_MEMBERS')) {
                let str = '';
                const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
                for (const file of commandFiles) {
                    const command = require(`./${file}`);
                    if (command.description.includes(`[mod]`))
                    str += `${prefix}${command.name}, ${command.description} \n`;
                }
                let embed = new Discord.RichEmbed()
                .setColor(`RANDOM`)
                .setThumbnail('https://cdn.discordapp.com/icons/628978428019736619/33f4cf09c0a0ee96c87d89bfd677e39a.png')
                .setDescription(`${str}`)
                .setTimestamp();
                return message.channel.send({
                    embed: embed
                });
            }
        }
        if (message.content === `${prefix}help general`) {
            let str = '';
            const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
            for (const file of commandFiles) {
                const command = require(`./${file}`);
                if (command.description.includes(`[general]`))
                str += `${prefix}${command.name}, ${command.description} \n`;
            }
            let embed = new Discord.RichEmbed()
            .setColor(`RANDOM`)
            .setThumbnail('https://cdn.discordapp.com/icons/628978428019736619/33f4cf09c0a0ee96c87d89bfd677e39a.png')
            .setDescription(`${str}\n!points, Display your own points\n!top, Show the point leaderboard\n!ping, display bot/server ping`)
            .setTimestamp();
            return message.channel.send({
                embed: embed
            });
        }
        if (message.content === `${prefix}help fun`) {
            let str = '';
            const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
            for (const file of commandFiles) {
                const command = require(`./${file}`);
                if (command.description.includes(`[fun]`))
                str += `${prefix}${command.name}, ${command.description} \n`;
            }
            let embed = new Discord.RichEmbed()
            .setColor(`RANDOM`)
            .setThumbnail('https://cdn.discordapp.com/icons/628978428019736619/33f4cf09c0a0ee96c87d89bfd677e39a.png')
            .setDescription(`${str}\n!gamble, Get rid of those points`)
            .setTimestamp();
            return message.channel.send({
                embed: embed
            });
        }
        if (message.content === `${prefix}help music`) {
            let str = '';
            const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
            for (const file of commandFiles) {
                const command = require(`./${file}`);
                if (command.description.includes(`[music]`))
                str += `${prefix}${command.name}, ${command.description} \n`;
            }
            let embed = new Discord.RichEmbed()
            .setColor(`RANDOM`)
            .setThumbnail('https://cdn.discordapp.com/icons/628978428019736619/33f4cf09c0a0ee96c87d89bfd677e39a.png')
            .setDescription(`${str}`)
            .setTimestamp();
            return message.channel.send({
                embed: embed
            });
        }
        let embed = new Discord.RichEmbed()
        .setColor(`RANDOM`)
        .setThumbnail('https://cdn.discordapp.com/icons/628978428019736619/33f4cf09c0a0ee96c87d89bfd677e39a.png')
        .setTitle('Pick a category')
        .setDescription(`${prefix}help general\n${prefix}help fun\n${prefix}help music\n${prefix}help mod\n${prefix}help admin`)
        .addField('Basic info:', '\nWhen Artemis replies with an Arrow up emote, you leveled up!\nYou can report a message by reaction to it with :x: \nhaving 3 :tea: reactions to a message will highlight it!')
        .setTimestamp();
        return message.channel.send({
            embed: embed
        });
    },
};