const monsterController = require('express').Router();

const db = require('../../models');
monsterController.get('/:id', (req, res) => {
    console.log(req.params.id)
    data = {test: req.params.id}
  res.json(data);
});


module.exports = monsterController;