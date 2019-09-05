const battleController = require('express').Router();
const battlefunctions = require('../../logic/battlefunctions');


battleController.post("/attack", (req, res) => {
    console.log(req.body);
    num = battlefunctions.random(1, 5);
    res.send({ num: num})
})

module.exports = battleController;