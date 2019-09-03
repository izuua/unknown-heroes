var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var HeroesSchema = new Schema({
    name: {
        type: String,
    },
    maxHp: {
        type: Number,
    },
    hpMod: {
        type: Number,
    },
    maxMp: {
        type: Number,
    },
    mpMod: {
        type: Number,
    },
    atk: {
        type: Number,
    },
    atkMod: {
        type: Number,
    },
    def: {
        type: Number,
    },
    defMod: {
        type: Number,
    },
    acc: {
        type: Number,
    },
    accMod: {
        type: Number,
    },
    eva: {
        type: Number,
    },
    evaMod: {
        type: Number,
    },
    spd: {
        type: Number,
    },
    spdMod: {
        type: Number,
    },
    specialAbility: {
        type: String,
    }
})

var Heroes = mongoose.model('Heroes', HeroesSchema);

module.exports = Heroes;