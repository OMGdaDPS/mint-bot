const Discord = module.require('discord.js');
const fs = require('fs');
const db = require('better-sqlite3')('./scores.sqlite');
const prefix = fs.readFileSync('./set/prefix.txt').toString();
module.exports = {
    name: 'opt',
    description: `[general] opt in out out from translation`,
    execute(message) {
        const getScore = db.prepare("SELECT * FROM scores WHERE user = ? AND guild = ?");
        const setScore = db.prepare("INSERT OR REPLACE INTO scores (id, user, guild, points, level, warning, muted, translate) VALUES (@id, @user, @guild, @points, @level, @warning, @muted, @translate);");
        const args = message.content.slice(5).split(" ");
        if (args[0] == `in`) {
            let translate = getScore.get(message.author.id, message.guild.id);
            if (translate.translate != `2`) {
                translate.translate = `2`;
                setScore.run(translate);
                return message.reply("You have opted in to auto translation!\nNote that your message will go trough a few non-opensource/private translators.");
            } else {
                return message.reply("You are already opted in!");
            }

        }
        if (args[0] == `out`) {
            let translate = getScore.get(message.author.id, message.guild.id);
            if (translate.translate == `2`) {
                translate.translate = `1`;
                setScore.run(translate);
                return message.reply("You opted out of auto translation!");
            } else {
                return message.reply("You are already opted out!");
            }
        }
        let translate = getScore.get(message.author.id, message.guild.id);
        if (translate.translate == `2`) {
            var optstatus = `Auto Translation is ON!`
        } else {
            var optstatus = `Auto Translation is OFF!`
        }
        message.reply(prefix + "opt in/out\n" + optstatus);
    },
};