const Discord = require('discord.js');
const client = new Discord.Client();
const util = require('./util.js');
const rollDie = require('./roll.js');
const welcomes = require('./welcome.js');

const numOfGreetings = 19;


lastInsult = 0;
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('guildMemberAdd', async (member) => {
    try {
        // Send the message to a designated channel on a server:
        var channel = member.guild.channels.find(ch => ch.name === 'member-log');
        // Do nothing if the channel wasn't found on this server
        if (!channel) {
            console.log('member-log channel missing');
            console.log('creating channel');

            await member.guild.createChannel('member-log', { 
                type: 'text',
                permissionOverwrites: [{
                    id: member.guild.id,
                    deny: [],
                    allow: ['SEND_MESSAGES','READ_MESSAGE_HISTORY','READ_MESSAGES','ADD_REACTIONS','SEND_TTS_MESSAGES']
              }]
            })
                .then(console.log)
                    .catch(console.error);
        }

        channel = member.guild.channels.find(ch => ch.name === 'member-log');

        const index = Math.floor((Math.random() * numOfGreetings) + 1);
        // Send the message, mentioning the member
        channel.send(welcomes.welcomings()[index] + member);
    }
    catch(e) {
        console.log('error in greeting newcomers');
        console.log(e);
    }
});

client.on('message', msg => {
    if (msg.content.startsWith('!')) {
        const cmdString = msg.content.substr(1);
        try {
            const args = cmdString.split(' ');
            lastInsult = 0;

            switch (args[0]) {
                case 'greetings':
                    const index = Math.floor((Math.random() * numOfGreetings) + 1);
                    msg.channel.send(welcomes.welcomings()[index] + msg.member);
                    break;
                case 'spam':
                    const user = msg.mentions.users.first();
                    if (user) {
                        // Now we get the member from the user
                        const member = msg.guild.member(user);
                        // If the member is in the guild
                        if (member) {
                            for (var i = 0; i < 5; i++) {
                                msg.channel.send(member + "!");
                            }
                        } 
                        else {
                          // The mentioned user isn't in this guild
                          msg.reply('That user doesn\'t exist!');
                        }
                    // Otherwise, if no user was mentioned
                    } 
                    else {
                        msg.reply('You didn\'t mention a user!');
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