const discord = require("discord.js");
const client = new discord.Client();
const config = require("./config/config.json");
const TOKEN = config.BOT.TOKEN;
const PREFIX = config.BOT.PREFIX;

client.on("ready", () => {
    console.log(`${client.user.tag} has logged in!`)
})

client.on("message", (message) => {
    if(message.author.bot) {return;}
    
    const isValidCommand = (message, cmdName) => (message.content.toLowerCase().startsWith(PREFIX + cmdName));
    if(isValidCommand(message, "hello")){
        message.channel.send(`Hello ${message.author.username}!`)
    }

    if(isValidCommand(message, "random")){
        const randomNumber = () => Math.floor(Math.random() * 10) + 1;

        message.channel.send(`${message.author.username} rolled a ` + randomNumber());
    }

    if(isValidCommand(message, "embed")){
        const embed = new discord.MessageEmbed();
        const embedText = "This is a test embed for **YouTube**!";
        embed.addField("Test Message", embedText);
        embed.setAuthor(message.author.tag, message.author.displayAvatarURL());
        embed.setTimestamp();
        embed.setImage(message.author.displayAvatarURL());
        embed.setTitle("Test embed triggered!");
        embed.setDescription("This is a test embed's description!");
        embed.setFooter("This is a test embed's footer");
        embed.setColor("#0f8cfa");


        message.channel.send(embed);
    }
})

client.login(TOKEN);