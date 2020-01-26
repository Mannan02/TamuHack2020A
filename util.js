const insulter = require('insult');
const shakespereInsulter = require('shakespeare-insult1.1.0')
exports.insultMe = () => insulter.Insult();

exports.shakespereInsult = () => shakespereInsulter.random()