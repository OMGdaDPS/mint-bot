const Discord = require('discord.js');
const request = require("request");
module.exports = {
    name: 'package',
    description: '[general] Searches Ubuntu/Mint packages',
    execute(message) {
        let args = message.content.slice(9);
        let baseurl = "https://api.launchpad.net/1.0/ubuntu/+archive/primary?ws.op=getPublishedSources&source_name=";
        let url = baseurl + args + '&exact_match=true';
        request(url, {
            json: true
        }, (err, res, body) => {
            if (!body.entries[0]) {
                const embed = new Discord.RichEmbed()
                    .setTitle(`Package`)
                    .setColor('RANDOM')
                    .setDescription('Not found!')
                return message.channel.send({
                    embed: embed
                });
            }
            let creator = body.entries[0].package_creator_link;
            let pkgname = body.entries[0].source_package_name;
            let version = body.entries[0].source_package_version;
            if (err) return message.channel.send(err);
            const embed = new Discord.RichEmbed()
                .setTitle(`${pkgname}`)
                .setColor('RANDOM')
                .setDescription(`sudo apt install ${pkgname}`)
                .addField('Version: ', `${version}`, true)
                .addField('Launchpad: ', `${creator}`, true)
            message.channel.send({
                embed: embed
            });
        });
    }
};