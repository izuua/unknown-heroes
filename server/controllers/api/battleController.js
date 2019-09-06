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


// battleController.post("/attack", (req, res) => {
//     console.log(req.body);

//     playerAccCheck = accuracy(player, enemy);
//     enemyAccCheck = accuracy(player, enemy);
//     if (playerAccCheck) {
//         damage = attack(player, enemy);
//         enemy.hp = enemy.hp-damage;
//         playerMessage = 
//     } else {

//     }

//     if (enemyAccCheck) {
//         damage = attack(enemy, player);
//         player.hp = player.hp-damage;
//     } else {

//     }


//     let gameOver = false;

//     received = true;

//     res.send({ 
//         playerMessage: playerMessage,
//         enemyMessage: enemyMessage,
//         gameOver: gameOver,
//         received: received
//     })
// })



module.exports = battleController;