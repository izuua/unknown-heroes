battlefunctions = {
    random(min, max) {
        return Math.floor((Math.random() * max) + min)
    },

    accuracy(attacker, defender) {
        let hitRate = 75 + ((defender.eva - attacker.eva)*3);
        let accCheck = battlefunctions.random(1, 100);
        if (accCheck <= hitRate) {
            return true;
        } else {
            return false;
        }
    },

    attack(attacker, defender) {
            return (battlefunctions.random(1,5) + (attacker.atk - defender.def));        
    },

    gameOverCheck() {

    }
}



module.exports = battlefunctions;


