exports.Roll = (args) => {
    var mods;
    var score = 0;

    var qty;
    var die;

    try {
        if (args.length <= 1) {
            throw e;
        }
        else {
            console.log("stub1");
            const dieRoll = args[1].split('d');
            console.log(dieRoll);
            if (dieRoll.length != 2) {
                throw e;
            }
            else {
                console.log("stub2");
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
    console.log("stub3");
    mods = 0;

    score += mods;

    return score.toString();
}