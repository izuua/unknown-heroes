battlefunctions = {
    random(min, max) {
        return Math.floor((Math.random() * max) + min)
    },

    accuracy(attacker, defender) {
        let hitRate = 75 + ((attacker.acc - defender.eva)*3);
        console.log(`hitRate ${hitRate}`)
        let accCheck = battlefunctions.random(1, 100);
        console.log(`accCheck ${accCheck}`)
        if (accCheck <= hitRate) {
            return true;
        } else {
            return false;
        }
    },

    attack(attacker, defender) {
        let damage = (battlefunctions.random(1,5) + (attacker.atk - defender.def));
        if (damage < 0) {
            return 0;
        } else {
            return damage;
        }   
    },

    defend(attacker) {
        let heal = Math.floor(attacker.hp*0.1)
        if (heal < 1) {
            return 1;
        } else {
            return heal;
        }
    }

    
}

module.exports = battlefunctions;


