const { Client, Message, MessageEmbed } = require("discord.js");
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
    name: "starters",
    aliases: ["iniciais"],

    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const embed = new MessageEmbed()
        .setColor("BLURPLE")
        .setAuthor({name: `${message.member.nickname || message.author.username}  Use \`${await db.get(`Prefixo_${message.guild.id}`)}choose\` para escolher seu pokémon!`})
    }
}