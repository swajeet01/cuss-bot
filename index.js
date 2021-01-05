const Discord = require("discord.js");
const config = require("./config.json");

const client = new Discord.Client();
client.login(config.BOT_TOKEN);

const prefix = "!";

const ownerId = config.OWNER_ID;

// Insert cuss words here
const cussWords = [];

// Whom not to cuss
const noCuss = [ownerId];

client.on("message", function(message) {
    if(message.author.bot) return;

    if(!message.content.startsWith(prefix)) return;

    const full_command = message.content.slice(prefix.length);
    const args = full_command.split(" ");
    const command = args.shift().toLowerCase();

    switch(command) {
        case "intro":
            onIntro(message);
            break;
        case "ping":
            onPing(message);
            break;
        case "cuss":
            onCuss(message, args);
            break;
        case "no-cuss":
            onNoCuss(message, args);
            break;
        default:
            message.reply(`${command}: Command not found`)
    }
});

const onIntro = function(message) {
    message.channel.send("Hello everyone! I am cuss-bot, I cuss people on request.");
}

const onPing = function(message) {
    const timeTaken = Date.now() - message.createdTimestamp;
    message.channel.send(`Ping ${timeTaken}ms.`);
}

const onCuss = function(message, args) {
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
}

const onNoCuss = function(message, args) {
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
    /* TODO: Fix @invalid-user mention on line 104
    let userName = client.users.cache.get(userId);
    if(userName == undefined) {
        message.reply("Okay! Not cussing that person anymore.");
        return;
    }
    message.reply(`Okay! Not cussing ${mention} anymore`);
    console.log(mention);
    console.log(args[0]);
    */
}

const getUserId = function(mention) {
    let userId = mention.includes('<@!') ? mention.replace('<@!', '').replace('>', '')
        : mention.includes('<@') ? mention.replace('<@', '').replace('>', '') : '';
    return userId
}
