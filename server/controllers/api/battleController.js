const battleController = require('express').Router();
const battlefunctions = require('../../logic/battlefunctions');

battleController.post("/start", (req, res) => {
    player = req.body.hero;
    enemy = req.body.enemy;
    player.hp = player.maxHp;
    enemy.hp = enemy.maxHp;
    console.log(player);
    console.log(enemy);
})


battleController.post("/attack", (req, res) => {
    console.log(req.body);

    let messageP = battlefunctions.attack(player, enemy);
    let messageE = battlefunctions.attack(player, enemy);
    let gameOver = false;

    // console.log(req.body.hero);
    // console.log(req.body.monster);
    console.log(req.body.num);
    received = true;

    res.send({ 
        messageP: messageP,
        messageE: messageE,
        gameOver: gameOver,
        received: received
    })
})



module.exports = battleController;