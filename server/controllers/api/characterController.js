const characterController = require('express').Router();

const db = require('../../models');
characterController.get('/', (req, res) => {
  db.Characters.find({
    'name' : { $in: [
      'Knight', 'Mage', 'Thief'
    ]}
  }, function (err, character) {
    if (err) throw err
      res.json(character);
    });
});

characterController.get('/enemies', (req, res) => {
  db.Characters.find({
    'name' : { $in: [
      'Bat', 'Goblin', 'Dragon'
    ]}
  }, function (err, enemy) {
    if (err) throw err
      res.json(enemy);
    });
});


module.exports = characterController;
