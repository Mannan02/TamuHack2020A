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
                                url: "https://media.giphy.com/media/SNGBqe0HcKgs8/giphy.gif"
                            }
                        }
                    })
                    break;
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