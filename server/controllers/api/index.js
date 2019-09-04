const apiControllers = require('express').Router();

apiControllers.use('/users', require('./usersController'));
apiControllers.use('/secrets', require('./secretsController'));
apiControllers.use('/hero', require('./heroController'));
apiControllers.use('/monster', require('./monsterController'));
module.exports = apiControllers;
