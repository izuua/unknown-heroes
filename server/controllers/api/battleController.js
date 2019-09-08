const battleController = require('express').Router();
const battlefunctions = require('../../logic/battlefunctions');

battleController.post("/start", (req, res) => {
    player = req.body.hero;
    enemy = req.body.enemy;
    plvl = req.body.level;
    console.log(`Level = ${plvl}`)
    player.hp = player.maxHp + (plvl * player.hpMod);
    // player.mp = player.maxMp + (plvl * player.mpMod);
    player.atk = player.atk + (plvl * player.atkMod);
    player.def = player.def + (plvl * player.defMod);
    player.acc = player.acc + (plvl * player.accMod);
    player.eva = player.eva + (plvl * player.evaMod);
    player.spd = player.spd + (plvl * player.spdMod);
    enemy.hp = enemy.maxHp;
    console.log(player);
    console.log(enemy);

    received = true;

    res.send({
        received: received
    })
})


battleController.get("/attack", (req, res) => {
    let gameOver = false;
    playerDead = "";

    playerAccCheck = battlefunctions.accuracy(player, enemy);
    enemyAccCheck = battlefunctions.accuracy(player, enemy);
    if (playerAccCheck) {
        damage = battlefunctions.attack(player, enemy);
        enemy.hp = enemy.hp - damage;
        playerMessage = `${player.name} hits the ${enemy.name} for ${damage} damage.`;
    } else {
        playerMessage = `${player.name} misses the ${enemy.name}.`;
    }

    if (enemy.hp > 0) {
        if (enemyAccCheck) {
            damage = battlefunctions.attack(enemy, player);
            player.hp = player.hp - damage;
            enemyMessage = `The ${enemy.name} hits ${player.name} for ${damage} damage.`;
        } else {
            enemyMessage = `The ${enemy.name} misses ${player.name}.`;
        }
    } else {
        enemy.hp = 0;
        enemyMessage = `${enemy.name} is knocked out!`;
        gameOver = true;
    }

    if (player.hp <= 0) {
        player.hp = 0;
        gameOver = true;
        playerDead = `${player.name} is knocked out!`;
    }

    received = true;

    res.send({
        playerHp: player.hp,
        enemyHp: enemy.hp,
        playerMessage: playerMessage,
        enemyMessage: enemyMessage,
        playerDead: playerDead,
        gameOver: gameOver,
        received: received
    })
})



module.exports = battleController;