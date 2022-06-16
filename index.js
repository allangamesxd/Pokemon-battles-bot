const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client({intents: 131071});
const { QuickDB } = require("quick.db");
const db = new QuickDB();

const config = require("./config.json");

client.login(config.BOT_TOKEN);

// Handler de comandos
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

fs.readdirSync(`./comandos`).forEach(local => {
    let commands = fs.readdirSync(`./comandos/${local}`).filter(arquivo => arquivo.endsWith('.js'));

    for(let file of commands) {
        let puxar = require(`./comandos/${local}/${file}`);

        if(puxar.name) {
            client.commands.set(puxar.name, puxar)
        };
        if(puxar.aliases && Array.isArray(puxar.aliases)) 
            puxar.aliases.forEach(x => client.aliases.set(x, puxar.name))
    }
});

client.on("messageCreate", async(message) => {
    let prefix = await db.get(`prefixos_${message.guild.id}`) || config.BOT_PREFIX;

    if(message.author.bot) return;
    
    if(message.content === `<@!${client.user.id}>` || message.content === `<@${client.user.id}>`) return message.reply({embeds: [new Discord.MessageEmbed() .setColor("YELLOW") .setDescription(`Olá ${message.author} meu prefixo nesse servidor é \`${prefix}\`.`)]})
    if(!message.content.toLowerCase().startsWith(prefix.toLowerCase())) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();
    if(cmd.length === 0) return;
    let command = client.commands.get(cmd);
    if(!command) command = client.commands.get(client.aliases.get(cmd));

    try {
        command.run(client, message, args)
    } catch (e) {
        console.error(`${e}`)
    }
});

// Events
client.on("ready", () => {
    console.log(`🍪 Conectado! \n Tag: ${client.user.tag}`);
});