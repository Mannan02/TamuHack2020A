const Discord = require('discord.js');
const client = new Discord.Client();
const insulter = require('insult');
const util = require('./util.js');
const rollDie = require('./roll.js');
const welcomes = require('./welcome.js');



lastInsult = 0;
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('guildMemberAdd', member => {
    // Send the message to a designated channel on a server:
    const channel = member.guild.channels.find(ch => ch.name === 'member-log');
    // Do nothing if the channel wasn't found on this server
    if (!channel) {
        console.log('member-log channel missing');
        return;
    }

    const numOfMsgs = 19;
    const index = Math.floor((Math.random() * numOfMsgs) + 1);
    // Send the message, mentioning the member
    channel.send(welcomes.welcomings()[index] + member);
});

client.on('message', msg => {
    if (msg.content.startsWith('!')) {
        const cmdString = msg.content.substr(1);
        try {
            const args = cmdString.split(' ');
            lastInsult = 0;

            switch (args[0]) {
                case 'spam':
                    for (var i = 0; i < 5; i++) {
                        msg.reply('');
                    }
                    break;
                case 'roll':
                    lastInsult = 0;

                    try {
                        msg.channel.send('Rolling die...');
                        msg.channel.send(rollDie.Roll(args));
                    } catch (err) {
                        console.log(err);
                        msg.reply('Something went wrong with command !' + args[0]);
                    }
                    break;
                case 'insultMe':
                    lastInsult = Math.floor(Date.now() / 1000)
                    msg.reply(util.insultMe())
                    break;
                case 'roastMe':
                    lastInsult = Math.floor(Date.now() / 1000);
                    msg.reply(util.shakespereInsult())
                    break;
                case 'Gartner':
                    lastInsult = 0;
                    msg.reply(util.gimmeTheDub())
                    msg.channel.send({
                        embed: {
                            image: {
                                url: "https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&ved=2ahUKEwjZyM_hw6HnAhUHDKwKHYXvD2AQjRx6BAgBEAQ&url=%2Furl%3Fsa%3Di%26rct%3Dj%26q%3D%26esrc%3Ds%26source%3Dimages%26cd%3D%26ved%3D2ahUKEwiQwKLfw6HnAhUKWqwKHWC0CR4QjRx6BAgBEAQ%26url%3Dhttps%253A%252F%252Fgiphy.com%252Fexplore%252Fbutter%26psig%3DAOvVaw1JHfBxAsUHE4j_Y4Q2nWMs%26ust%3D1580137100757284&psig=AOvVaw1JHfBxAsUHE4j_Y4Q2nWMs&ust=1580137100757284"
                            }
                        }
                    })
                default:
                    msg.reply('?');
            }
        } catch (err) {
            console.log(err);
        }
    } else if (Math.floor(Date.now() / 1000) - lastInsult <= 60 && msg.isMemberMentioned(client.user)) {

        parseFloat(util.isInsult(msg));
    }
});
client.login(process.env.BOT_ID);