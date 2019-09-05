const characterController = require('express').Router();

const db = require('../../models');
characterController.get('/:id', (req, res) => {
  console.log(db.Characters)
  db.Characters.findOne({_id: req.params.id}, function (err, character) {
    if (err) throw err
    console.log(character)
      res.json(character);
    });
});


module.exports = characterController;
