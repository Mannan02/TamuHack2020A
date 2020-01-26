exports.Roll = (args) => {
    var cap = 100;
    var diceRoll;
    var diceRoll2;
    var die = 0;
    var mods = 0;
    var qty = 0;
//    var re1 = 'd';
//    var re2 = '+';
    var score;

    for (obj in args) {
        console.log(args[obj]);
    }
    
    //~ Filter for the quantity of dice to roll, the type of dice being rolled,
    //~ and looks for any modifiers.
    try {

        diceRoll = args[1].split('d');

        //! Throw error if dice quantity is out of bounds.
        if (diceRoll.length != 2) { throw 1; }

        qty = diceRoll[0];
        
        diceRoll2 = diceRoll[1].split('+');

        if (diceRoll2.length != 1 && diceRoll2.length != 2) { throw 1; }
        die = diceRoll2[0]

        if (diceRoll2.length == 2) {
            mods = diceRoll2[1];
        }        

        //! Throw error if the dice rolls are out of bounds.
        if ((qty < 0) || (qty > cap) || (die < 0) || (die > cap) || (mods < 0) || (mods > cap)) {
            throw 2;
        }
        
        //~ Determine the score
        score = 0;

        for (var i = 0; i < qty; i++) {
            score += Math.floor((Math.random() * parseInt(die)) + 1);
        }
        score = parseInt(score) + parseInt(mods);
    }
    catch (e) {
        console.log('Entered Catch');
        switch(e) {
            case 1:
                score = "The dice fell off the table... try again";
                break;
            case 2:
                score = "Hey, those dice are illegal!";
                break;
            default:
                "Sorry, missed that. What happened?";
        }
    }

    return score.toString();
}