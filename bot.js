const discord = require("discord.js");
const client = new discord.Client();
const config = require("./config/config.json");
const profanities = require("profanities");
const TOKEN = config.BOT.TOKEN;
const PREFIX = config.BOT.PREFIX;
var serverAmount;

function updateServerCount(){
    serverAmount = client.guilds.cache.size;
    setTimeout(updateServerCount, 5000);
}

client.on("ready", () => {
    console.log(`${client.user.tag} has logged in!`);
    updateServerCount();
    client.user.setActivity(serverAmount + " Servers!", {type : "WATCHING"});
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

    if(isValidCommand(message, "ban")){
        if(message.member.hasPermission("BAN_MEMBERS")){
            const memberID = message.content.substring(message.content.indexOf(" ") + 1);
            const member = message.guild.members.cache.get(memberID);

            if(member){
                if(member.hasPermission("ADMINISTRATOR")){
                    message.channel.send("This user is an owner or an admin, you can't ban them.");
                }
                else{
                    member.ban();
                    message.channel.send("Successfully banned user " + memberID);
                }
            }
            else{
                message.channel.send("Couldn't find that user.");
            }
        }
        else{
            message.reply("you don't have the needed permissions to do this!");
        }
    }

    if(isValidCommand(message, "kick")){
        if(message.member.hasPermission("KICK_MEMBERS")){
            const memberID = message.content.substring(message.content.indexOf(" ") + 1);
            const member = message.guild.members.cache.get(memberID);

            if(member){
                if(member.hasPermission("ADMINISTRATOR")){
                    message.channel.send("This user is an owner or an admin, you can't kick them.");
                }
                else{
                    member.kick();
                    message.channel.send("Successfully kicked user " + memberID);
                }
            }
            else{
                message.channel.send("Couldn't find that user.");
            }
        }
        else{
            message.reply("you don't have the needed permissions to do this!");
        }
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

    for(x = 0; x < profanities.length; x++){
        const msg = message.content.toLowerCase();
        if(msg.includes(profanities[x])){
            const profanityEmbed = new discord.MessageEmbed();
            const profanityMessage = `**${message.author.username}**! You can't say this! if you continue to break the rules, you may be **banned**`;
            profanityEmbed.addField("Warning", profanityMessage);
            profanityEmbed.setColor("#ff1c1c");
            profanityEmbed.setAuthor(message.author.tag, message.author.displayAvatarURL);
            profanityEmbed.setTimestamp();
            message.delete();
            message.channel.send(profanityEmbed);
        }
        return;
    }
})

client.login(TOKEN);