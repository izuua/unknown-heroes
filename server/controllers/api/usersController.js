const usersController = require('express').Router();

const db = require('../../models');
const { JWTVerifier } = require('../../lib/passport');
const jwt = require('jsonwebtoken');

usersController.post('/', (req, res) => {
  const { email, password } = req.body;

  db.Users.create({ email, password })
    .then(user => res.json(user))
    .catch(err => res.json(err));
});

usersController.get('/me', JWTVerifier, (req, res) => {
  res.json(req.user);
});

usersController.get("/:id", (req, res) => {
  db.Users.findById(req.params.id)
    .then(stats => res.json(stats))
    .catch(err => console.log(err))
})

usersController.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.Users.findOne({ email })
    .then(user => {
      if (!user || !user.comparePassword(password)) {
        return res.status(401).send("Unauthorized");
      }

      res.json({
        token: jwt.sign({ sub: user.id }, process.env.JWT_SECRET),
        user
      });
    });
});

usersController.post("/results", (req, res) => {
  const { roundWon, xpGain, goldGain } = req.body.results
  const hero = req.body.results.hero
  const heroName = hero.name.toLowerCase()

  const heroLevel = `${heroName}Level`
  let currentLevel = hero.level
  let newLevel;

  const heroExp = `${heroName}Exp`
  let currentExp = hero.exp
  let xpNeeded = hero.level * 200

  let levelUp = false
  if (currentExp + xpGain >= xpNeeded) {
    newLevel = currentLevel + 1
    currentExp = 0
    levelUp = true
  } else {
    newLevel = currentLevel
    currentExp += xpGain
  }

  db.Users.findByIdAndUpdate({ _id: req.body.id }, {
    $set: {
      [heroLevel]: newLevel,
      [heroExp]: currentExp
    },
    options: {
      useFindAndModify: false,
      returnOriginal: false
    }
  })
    .then(user => {
      res.json({ levelUp })
    })
    .catch(err => console.log(err))
})

module.exports = usersController;
