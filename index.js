const Discord = require("discord.js");
const config = require("./config.json");

const client = new Discord.Client();
client.login(config.BOT_TOKEN);

const prefix = "!";

// Insert cuss words here
const cussWords = [];

// Whom not to cuss
const noCuss = [];

client.on("message", function(message) {
    if(message.author.bot) return;

    if(!message.content.startsWith(prefix)) return;

    const full_command = message.content.slice(prefix.length);
    const args = full_command.split(" ");
    const command = args.shift().toLowerCase();

    switch(command) {
        case "ping":
            onPing(message);
            break;
        case "cuss":
            onCuss(message, args);
            break;
        default:
            message.reply(`${command}: Command not found`)
    }
});

const onPing = function(message) {
    const timeTaken = Date.now() - message.createdTimestamp;
    message.channel.send(`Ping ${timeTaken}ms`);
}

const onCuss = function(message, args) {
    const cussLen = cussWords.length;
    if(args.length == 0) {
        message.channel.send("Err: command 'cuss' requires and argument");
        return;
    }
    if(noCuss.includes(args[0].toLowerCase())) {
        message.reply(`Can't cuss ${args[0]}`);
        return;
    }
    const cussIndex = Math.floor(Math.random() * cussLen);
    message.channel.send(`${args[0]} ${cussWords[cussIndex]}`);
}
