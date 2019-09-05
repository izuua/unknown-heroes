const mongoose = require("mongoose");
const db = require("../server/models");

mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/unknownheroes"
)

const characterSeed = [
    {
        name: "Knight",
        maxHp: 20,
        hpMod: 5,
        atk: 3,
        atkMod: 2,
        def: 3,
        defMod: 3,
        acc: 2,
        accMod: 2,
        eva: 1,
        evaMod: 1,
        spd: 1,
        spdMod: 1
    },
    {
        name: "Thief",
        maxHp: 15,
        hpMod: 3,
        atk: 2,
        atkMod: 1,
        def: 1,
        defMod: 1,
        acc: 4,
        accMod: 3,
        eva: 4,
        evaMod: 3,
        spd: 4,
        spdMod: 3
    },
    {
        name: "Mage",
        maxHp: 15,
        hpMod: 3,
        atk: 5,
        atkMod: 3,
        def: 1,
        defMod: 1,
        acc: 2,
        accMod: 2,
        eva: 2,
        evaMod: 2,
        spd: 2,
        spdMod: 2
    },
    {
        name: "Bat",
        maxHp: 10,
        atk: 2,
        def: 2,
        acc: 2,
        eva: 2,
        spd: 1,
        exp: 100,
        gold: 100
    },
    {
        name: "Goblin",
        maxHp: 40,
        atk: 6,
        def: 6,
        acc: 6,
        eva: 6,
        spd: 6,
        exp: 400,
        gold: 400
    },
    {
        name: "Dragon",
        maxHp: 100,
        atk: 30,
        def: 30,
        acc: 30,
        eva: 30,
        spd: 30,
        exp: 1000,
        gold: 1000
    }
]

db.Characters
.remove({})
.then(() => db.Characters.collection.insertMany(characterSeed))
.then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
})
.catch(err => {
    console.error(err);
    process.exit(1);
})