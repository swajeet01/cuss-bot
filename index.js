const Discord = require("discord.js");
const config = require("./config.json");

const client = new Discord.Client();
client.login(config.botToken);

const prefix = "~";

const ownerId = config.ownerId;

// Insert cuss words here
const cussWords = new Set("good", "sexy", "jodd");

// Whom not to cuss
const noCuss = [ownerId];

const getUserId = (mention) => {
    let userId = mention.includes('<@!') ? mention.replace('<@!', '').replace('>', '')
        : mention.includes('<@') ? mention.replace('<@', '').replace('>', '') : '';
    return userId
}

const commands = {
    "intro": (message) => {
        message.channel.send("Hello everyone! I am cuss-bot, I cuss people on request.");
    },
    "ping": (message) => {
        let timeTaken = Date.now() - message.createdTimestamp;
        message.channel.send(`Ping ${timeTaken}ms.`);
    },
    "cuss": (message, args) => {
        if(args.length == 0) {
            message.channel.send("Err: command 'cuss' requires an argument");
            return;
        }
        let mention = args[0]
        let userId = getUserId(mention);
        if(userId === "") {
            message.channel.send("Err: User not found");
            return;
        }
        if(noCuss.includes(userId)) {
            message.reply("Can't cuss this user!");
            return;
        }
        let userName = client.users.cache.get(userId);
        if(userName == undefined) {
            message.reply("Can't cuss this user!");
            return;
        }
        let cussIndex = Math.floor(Math.random() * cussWords.length);
        message.channel.send(`${mention} ${cussWords[cussIndex]}`)
    },
    "no-cuss": (message, args) => {
        if(message.author.id !== "" + ownerId) {
            message.reply("Only authorized members can use this command!");
            return;
        }
        if(args.length == 0) {
            message.channel.send("Err: command 'no-cuss' requires an argument");
            return;
        }
        let mention = args[0];
        let userId = getUserId(mention);
        if(userId === "") {
            message.channel.send("Err: User not found");
            return;
        }
        if(noCuss.includes(userId)) {
            message.reply("Already in no-cuss members.");
            return;
        }
        noCuss.push(userId);
        message.reply("Okay! Not cussing that person anymore.");
        /* TODO: Fix @invalid-user mention
        let userName = client.users.cache.get(userId);
        if(userName == undefined) {
            message.reply("Okay! Not cussing that person anymore.");
            return;
        }
        message.reply(`Okay! Not cussing ${mention} anymore`);
        console.log(mention);
        console.log(args[0]);
        */
    },
    "add-cuss": (message, args) => {
        if(args.length == 0) {
            message.channel.send("Err: command 'add-cuss' requires an argument");
            return;
        }
        cussWords.add(args[0]);
        message.channel.send(`${args[0]} added to cuss words`);
    }
}

client.on("message", (message) => {
    if(message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;
    let fullCommand = message.content.slice(prefix.length);
    let args = fullCommand.split(" ");
    let command = args.shift().toLowerCase();
    try {
        commands[command](message, args);
    } catch {
        message.reply(`${command}: Can not execute`)
    }
});