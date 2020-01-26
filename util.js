const insulter = require('insult');
const shakespereInsulter = require('shakespeare-insult1.1.0')
var googleapis = require('googleapis');

API_KEY = 'AIzaSyDzSbx1qor1BiRRlFaU4rJVyb-XaY3w_Ig'
DISCOVERY_URL = 'https://commentanalyzer.googleapis.com/$discovery/rest?version=v1alpha1'

exports.insultMe = () => insulter.Insult();

exports.shakespereInsult = () => shakespereInsulter.random();

exports.isInsult = comment => googleapis.discoverAPI(DISCOVERY_URL, (err, client) => {
    if (err) throw err;
    var analyzeRequest = {
        comment: { text: comment },
        requestedAttributes: { 'INSULT': {} }
    };
    client.comments.analyze({ key: API_KEY, resource: analyzeRequest }, (err, response) => {
        if (err) throw err;
        console.log(JSON.stringify(response, null, 2));
    });
});