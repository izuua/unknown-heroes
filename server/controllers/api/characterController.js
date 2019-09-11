const characterController = require('express').Router();

const db = require('../../models');
characterController.post('/', (req, res) => {
  const [...levels] = req.body.levels
  db.Characters.find({
    'name': {
      $in: [
        'Knight', 'Thief', 'Mage'
      ]
    }
  }, function (err, heroes) {
    if (err) throw err

    let stats = heroes.map(hero => hero)

    for (let i = 0; i < stats.length; i++) {
      stats[i].maxHp += stats[i].hpMod * (levels[i] - 1)
      stats[i].atk += stats[i].atkMod * (levels[i] - 1)
      stats[i].def += stats[i].defMod * (levels[i] - 1)
      stats[i].acc += stats[i].accMod * (levels[i] - 1)
      stats[i].eva += stats[i].evaMod * (levels[i] - 1)
      stats[i].spd += stats[i].spdMod * (levels[i] - 1)
    }

    console.log(stats)
    res.json(stats);
  });
});

characterController.get('/enemies', (req, res) => {
  db.Characters.find({
    'name': {
      $in: [
        'Bat', 'Goblin', 'Dragon'
      ]
    }
  }, function (err, enemy) {
    if (err) throw err
    res.json(enemy);
  });
});


module.exports = characterController;
