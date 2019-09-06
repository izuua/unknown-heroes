battlefunctions = {
    random(min, max) {
        return Math.floor((Math.random() * max) + min)
    },

    accuracy(object1, object2) {
        let hitRate = 75 + ((object1.eva - object2.eva)*3);
        let accCheck = battlefunctions.random(1, 100);
        if (accCheck <= hitRate) {
            return true;
        } else {
            return false;
        }
    },

    attack(attacker, defender) {
        accCheck = battlefunctions.accuracy(attacker, defender)
        if (accCheck === true) {
            damage = (battlefunctions.random(1,5) + (attacker.atk - defender.def));
            return `The ${attacker.name} hits the ${req.body.defender.name} for ${damage} damage.`
        } else {
            return `The ${attacker.name} misses the ${defender.name}.`
        }
        
    },

    gameOverCheck() {

    }
}



module.exports = battlefunctions;


