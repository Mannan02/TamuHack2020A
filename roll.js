exports.Roll = (args) => {
    var mods;
    var randRoll;
    var score;

    try {
        if (args.length <= 1) {
            throw e;
        }
        else {
            const dieRoll = params.split('d');
            if (dieroll.length != 2) {
                throw e;
            }
            else {
                var qty = dieRoll[0];
                var die = dieRoll[1];
            }
        }
    }
    catch (e) {
        score.toString("FAILED >:(");
    }
    var randRoll = Math.floor((Math.random() * die ) + 1);
    
    var mods = 0;

    var score = ((qty * die) + mods);
    return(score);
}