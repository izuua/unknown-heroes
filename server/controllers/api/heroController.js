const heroController = require('express').Router();

const db = require('../../models');
heroController.get('/:id', (req, res) => {
    console.log(req.params.id)
    data = {test: req.params.id}
  res.json(data);
});


module.exports = heroController;
