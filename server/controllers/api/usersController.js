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
  db.Users.findById(req.params.id, "knightLevel mageLevel thiefLevel")
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
  console.dir(req.body)
  const { roundWon, xpGain, goldGain } = req.body.results
  const heroName = req.body.results.heroName.toLowerCase()

  const heroLevel = `${heroName}Level`
  let currentLevel = req.body.user[heroLevel]
  let newLevel;

  const heroExp = `${heroName}Exp`
  let currentExp = req.body.user[heroExp]
  let xpNeeded = req.body.user[heroLevel] * 200
  console.log(`Current xp ${currentExp}`)
  console.log(`User lvl ${req.body.user.knightLevel}`)
  console.log(`User xp ${req.body.user.knightExp}`)
  if (currentExp + xpGain >= xpNeeded) {
    newLevel = currentLevel + 1
    currentExp = 0
  } else {
    newLevel = currentLevel
    currentExp += xpGain
  }

  db.Users.findByIdAndUpdate({ _id: req.body.user._id }, {
    $set: {
      [heroLevel]: newLevel,
      [heroExp]: currentExp
    },
    options: { 
      useFindAndModify: false,
      new: true,
      select: heroLevel, heroExp
    }
  })
    .then(user => {
      console.log(user)
      res.json(user)
    })
    .catch(err => console.log(err))
})

module.exports = usersController;
