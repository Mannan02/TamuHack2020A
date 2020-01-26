const insulter = require('insult');
const shakespereInsulter = require('shakespeare-insult')
exports.insultMe = () => insulter.Insult();

exports.shakespereInsult = () => shakespereInsulter.random();