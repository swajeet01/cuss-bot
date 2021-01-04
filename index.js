const Discord = require("discord.js");
const config = require("./config.json");

const client = new Discord.Client();
client.login(config.BOT_TOKEN);

const prefix = "!";

client.on("message", function(message) {
    if(message.author.bot) return;

    if(!message.content.startsWith(prefix)) return;

    const full_command = message.content.slice(prefix.length);
    const args = full_command.split(" ");
    const command = args.shift().toLowerCase();

    if(command === "ping") {
        onPing(message);
    }
});

const onPing = function(message) {
    const timeTaken = Date.now() - message.createdTimestamp;
    message.reply(`Ping ${timeTaken}ms`);
}