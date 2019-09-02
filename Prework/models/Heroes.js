var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var HeroesSchema = new Schema({
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
})

var Heroes = mongoose.model('Heroes', HeroesSchema);

module.exports = Heroes;