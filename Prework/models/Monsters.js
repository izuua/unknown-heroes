var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var MonstersSchema = new Schema({
    name: {
        type: String,
    },
    maxHp: {
        type: Number,
    },
    maxMp: {
        type: Number,
    },
    atk: {
        type: Number,
    },
    def: {
        type: Number,
    },
    acc: {
        type: Number,
    },
    eva: {
        type: Number,
    },
    spd: {
        type: Number,
    },
    exp: {
        type: Number,
    },
    gold: {
        type: Number,
    }
})

var Monsters = mongoose.model('Monsters', MonstersSchema);

module.exports = Monsters;