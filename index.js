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
    message.channel.send(`Ping ${timeTaken}ms.`);
}

const onCuss = function(message, args) {
    if(args.length == 0) {
        message.channel.send("Err: command 'cuss' requires and argument");
        return;
    }
    let userId = args[0].includes('<@!') ? args[0].replace('<@!', '').replace('>', '')
        : args[0].includes('<@') ? args[0].replace('<@', '').replace('>', '') : '';
    if(userId === "") {
        message.channel.send("Err: User not found");
        return;
    }
    let userName = client.users.cache.get(userId);
    let cussIndex = Math.floor(Math.random() * cussWords.length);
    message.channel.send(`${userName} ${cussWords[cussIndex]}`)
}
