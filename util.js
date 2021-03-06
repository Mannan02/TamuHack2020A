const insulter = require('insult');
const shakespereInsulter = require('shakespeare-insult1.1.0')
var request = require('request');
API_KEY = process.env.API_KEY;
DISCOVERY_URL = 'https://commentanalyzer.googleapis.com/$discovery/rest?version=v1alpha1';
url = 'https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze' +
    '?key=' + API_KEY
myArray = [
    "You would be the kind of person who eats the last slice of pizza",
    "You would be the kind of person who puts pinapple on pizza",
    "You would be the kind of person who cuts their pizza in squares"
]
exports.insultMe = () => insulter.Insult();

exports.shakespereInsult = () => shakespereInsulter.random();

exports.gimmeTheDub = () => "Oh Gartner, How great art thou"

exports.isInsult = (msg) => {
    data_dict = {
        'comment': { 'text': msg.content },
        'languages': ['en'],
        'requestedAttributes': { 'INSULT': {} }
    }
    var clientServerOptions = {
        uri: url,
        body: JSON.stringify(data_dict),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    request(clientServerOptions, function(error, response) {
        res = JSON.parse(response.body)
        console.log(res)
        val = res.attributeScores.INSULT.summaryScore.value;
        console.log(val)
        if (val > 0.5) {
            msg.reply(insulter.Insult())
        } else {
            msg.reply("You call that an insult. " + myArray[Math.floor(Math.random() * myArray.length)])
        }
    });
}