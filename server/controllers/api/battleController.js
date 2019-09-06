const battleController = require('express').Router();
const battlefunctions = require('../../logic/battlefunctions');
// const app = require('../../server.js')


battleController.post("/attack", (req, res) => {
    console.log(req.body);

    let messageP = battlefunctions.attack(req.body.hero, req.body.monster);
    let messageE = battlefunctions.attack(req.body.monster, req.body.hero);
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