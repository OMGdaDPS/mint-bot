const Discord = require('discord.js');
const db = require('better-sqlite3')('./scores.sqlite');
module.exports = {
    name: 'leave',
    description: '[general] Leave a self assignable role',
    execute(message) {
        const args = message.content.slice(7);
        const member = message.member;
        const allroles = db.prepare("SELECT * FROM roles WHERE guild = ?;").all(message.guild.id);
        let array2 = [];
        for (const data of allroles) {
            array2.push(message.guild.roles.find(r => r.id == data.roles).name);
        }
        if (array2.includes(args)) {
            const role = message.guild.roles.find(r => r.name === args);
            let checking = message.member.roles.find(r => r.name === args);
            if (!checking) return message.reply("You do not have this role.");
            member.removeRole(role).catch(console.error);
            const embed = new Discord.RichEmbed()
                .setDescription(message.author)
                .setColor('RANDOM')
                .addField('Left: ', role);
            return message.channel.send({
                embed
            });
        }
        message.reply("Invalid role!");
    }
};