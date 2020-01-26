const Discord = require('discord.js');
const client = new Discord.Client();
const insulter = require('insult');
const util = require('./util.js')
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (msg.content.startsWith('!')) {
        const cmdString = msg.content.substr(1);
        try {
            const args = cmdString.split(' ');
            switch (args[0]) {
                case 'ping':
                    msg.reply('Pong!');
                    break;
                case 'spam':
                    for (var i = 0; i < 20; i++) {
                        msg.reply('');
                    }
                    break;
                case 'roll':
                    try {
                        msg.channel.send('Rolling die...');
                    } catch (err) {
                        console.log(err);
                        msg.reply('Something went wrong with command !' + args[0]);
                    }
                    break;
                case 'insultMe':
                    msg.reply(insulter.Insult())
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