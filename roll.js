exports.Roll = (args) => {
    var cap = 100;
    var condition = '';
    var diceRoll = 0;
    var diceRoll2 = 0;
    var die = 0;
    var mods = 0;
    var qty = 0;
    var rand = Math.random();
    var re1 = 'd';
    var re2 = '+';
    var score = 0;

    for (i in args) {
        condition += i[];
    }
    console.log(condition);
    //~ Filter for the quantity of dice to roll, the type of dice being rolled,
    //~ and looks for any modifiers.
    try {
        console.log('1');
        //! Throw error if dice quantity is out of bounds.
        if ((args.length < 2 || args.length > 3)) { throw 1; }
        console.log('2');
        if (condition.includes(re1) && !condition.includes(re2)) {
            diceRoll = condition[1].split(condition);
            console.log('3');
            //! Throw error if dice quantity is out of bounds.
            if (diceRoll.length != 2) { throw 1; }
            console.log('4');
            qty = diceRoll[0];
            die = diceRoll[1];
            console.log('5');
            console.log('6');
        }
        else if (condition.includes(re1) && condition.includes(re2)) {
            diceRoll = condition[1].split(re1);
            //! Throw error if dice quantity is out of bounds.
            if(diceRoll.length != 2) { throw 1; }
            console.log('7');
            qty = diceRoll[0];
            diceRoll2 = diceRoll[1];
            console.log('8');
            console.log(qty);
            diceRoll = diceRoll2[1].split(re2);
            //! Throw error if dice quantity is out of bounds.
            if(diceRoll.length != 2) { throw 1; }
            console.log('10');
            die = diceRoll2[0];
            mods = diceRoll2[1];
            console.log('11');
            console.log(mods+12);
        }

        //! Throw error if the dice rolls are out of bounds.
        if ((qty.isNan()) || (qty < -cap) || (qty > cap)
        || (die.isNan()) || (die < -cap) || (die > cap)
        || (mods.isNan()) || (mods < -cap) || (mods > cap)) {
            throw 2;
        }
        
        //~ Determine the score
        for (var i = 0; i < qty; i++) {
            score += Math.floor((rand * die) + 1);
        }
        score += mods;
    }
    catch (e) {
        score.toString();
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

    return score;
}