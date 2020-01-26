const insulter = require('insult');
const shakespereInsulter = require('shakespeare-insult1.1.0')
var request = require('request');
var json = require('json')
API_KEY = process.env.API_KEY;
DISCOVERY_URL = 'https://commentanalyzer.googleapis.com/$discovery/rest?version=v1alpha1';
url = ('https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze' +
    '?key=' + API_KEY)
data_dict = {
    'comment': { 'text': 'what kind of idiot name is foo?' },
    'languages': ['en'],
    'requestedAttributes': { 'TOXICITY': {} }
}
exports.insultMe = () => insulter.Insult();

exports.shakespereInsult = () => shakespereInsulter.random();

exports.isInsult = comment => {
    response = requests.post(url = url, data = json.dumps(data_dict))
    response_dict = json.loads(response.content)
    console.log(json.dumps(response_dict, indent = 2))
}