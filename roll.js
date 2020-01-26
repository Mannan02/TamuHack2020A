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
    randRoll = Math.floor((Math.random() * die ) + 1);
    
    mods = 0;

    score = ((qty * randRoll) + mods);
    return(score);
}