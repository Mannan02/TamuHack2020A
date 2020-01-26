exports.Roll = (args) => {
    var cap = 100;
    var diceRoll = '';
    var die = 0;
    var mods = 0;
    var qty = 0;
    var score = 0;

    try {
        //filter for the quantity of dice to roll and the type of dice being rolled
        if (args.length <= 1) { throw 1; }
        else {
            dieRoll = args[1].split('d');
            if (dieRoll.length != 2) { throw 1; }
            else {
                qty = dieRoll[0];
                die = dieRoll[1];
                if ((qty.isNan()) || (qty.isNan()) || (qty < -cap)
                || (qty > cap) || (die < -cap) || (die > cap)) {
                    throw 2;
                }
            }
        }

        //check if any modifiers are being applied
        dieRoll = args[1].split('+');
        if (dieRoll.length != 2) { throw 4; }
        else {
            mods = dieRoll[1];
            if ((mods.isNan()) || (mods < -cap) || (mods > cap)) { throw 3; }
        }
        
        //determine the score
        for (var i = 0; i < qty; i++) {
            score += Math.floor((Math.random() * die) + 1);
        }
        score += mods;
    }
    catch (e) {
        switch(e) {
            case 1:
                score = "The dice fell off the table... try again";
                break;
            case 2:
                score = "Hey, those dice are illegal!";
                break;
            case 3:
                score = "Those modifiers are a definately a bluff... try again";
                break;
            case 4:
                score = "The dice fell off the table... again... try again";
                break;
            default:
                "Sorry, missed that. What happened?";
        }
    }

    return score.toString();
}