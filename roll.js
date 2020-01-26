exports.Roll = (args) => {
    var mods;
    var randRoll;
    var score = 0;

    var qty;
    var die;

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
                qty = dieRoll[0];
                die = dieRoll[1];
            }
        }
    }
    catch (e) {
        return "FAILED >:(";
    }
    
    for (var i = 0; i < qty; i++) {
        score += Math.floor((Math.random() * die) + 1);
    }

    mods = 0;

    score += mods;

    return score.toString();
}