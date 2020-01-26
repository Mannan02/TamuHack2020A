const Discord = require('discord.js');
const client = new Discord.Client();
const insulter = require('insult');
const util = require('./util.js');
const rollDie = require('./roll.js');
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
    // Send the message, mentioning the member
    channel.send(`Welcome to the server, ${member}`);
});

client.on('message', msg => {
    util.isInsult(msg)
    if (msg.content.startsWith('!')) {
        const cmdString = msg.content.substr(1);
        try {
            const args = cmdString.split(' ');
            switch (args[0]) {
                case 'spam':
                    for (var i = 0; i < 5; i++) {
                        msg.reply('');
                    }
                    break;
                case 'roll':
                    try {
                        msg.channel.send('Rolling die...');
                        msg.channel.send(rollDie.Roll(args));
                    } catch (err) {
                        console.log(err);
                        msg.reply('Something went wrong with command !' + args[0]);
                    }
                    break;
                case 'insultMe':
                    msg.reply(util.insultMe())
                    break;
                case 'roastMe':
                    msg.reply(util.shakespereInsult())
                    break;
                default:
                    msg.reply('?');
            }
        } catch (err) {
            console.log(err);
        }
    }
});
client.login(process.env.BOT_ID);