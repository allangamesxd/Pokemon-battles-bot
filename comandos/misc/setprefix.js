const { Client, Message, MessageEmbed } = require("discord.js");
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
    name: "setprefix",
    aliases: ["prefix", "prefixo"],

    /**
     * Define o prefixo do bot no servidor
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        let prefixo = args.join(" ");
        if(!message.member.permissions.has("MANAGE_GUILD")) return message.reply({embeds: [new MessageEmbed() .setColor("RED") .setDescription(`:x: ${message.author} Você precisa da permissão \`GERENCIAR SERVIDOR\` para executar esse comando!`) .setFooter(`${message.member.nickname || message.author.username}`, message.author.displayAvatarURL({dynamic: true}))]});
        if(!prefixo) prefixo = "Padrão";

        message.reply({embeds: [new MessageEmbed()
        .setColor("GREEN")
    .setAuthor(`${message.member.nickname || message.author.username}`, message.author.displayAvatarURL({dynamic: true}))
    .setDescription(`:white_check_mark: ${message.author} O prefixo foi definido para \`${args.join(" ")}\``)]}).catch(() => {});
if(prefixo === "Padrão") prefixo = "b!";

    db.set(`prefixos_${message.guild.id}`, prefixo);
    }
}