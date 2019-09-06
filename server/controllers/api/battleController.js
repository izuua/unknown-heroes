const battleController = require('express').Router();
const battlefunctions = require('../../logic/battlefunctions');

battleController.post("/start", (req, res) => {
    player = req.body.hero;
    enemy = req.body.enemy;
    plvl = req.body.level;
    console.log(`Level = ${plvl}`)
    player.hp = player.maxHp;
    enemy.hp = enemy.maxHp;
    console.log(player);
    console.log(enemy);
})


battleController.get("/attack", (req, res) => {
    console.log(req.body);

    playerAccCheck = battlefunctions.accuracy(player, enemy);
    enemyAccCheck = battlefunctions.accuracy(player, enemy);
    if (playerAccCheck) {
        damage =battlefunctions.attack(player, enemy);
        enemy.hp = enemy.hp-damage;
        playerMessage = `${player.name} hit target for ${damage}`
    } else {

        playerMessage = `${player.name} misses ${enemy.name}`
    }

    if (enemyAccCheck) {
        damage = battlefunctions.attack(enemy, player);
        player.hp = player.hp-damage;
        enemyMessage = `${enemy.name} hit taget for ${damage}`
    } else {
enemyMessage = `${enemy.name} misses ${player.name}`
    }


    let gameOver = false;

    received = true;

    res.send({ 
        playerMessage: playerMessage,
        enemyMessage: enemyMessage,
        gameOver: gameOver,
        received: received,
        playerHp: player.hp,
        enemyHp: enemy.hp 

    })
})



module.exports = battleController;