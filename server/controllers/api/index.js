const apiControllers = require('express').Router();

apiControllers.use('/users', require('./usersController'));
apiControllers.use('/secrets', require('./secretsController'));
apiControllers.use('/character', require('./characterController'));
apiControllers.use('/battle', require('./battleController'))

module.exports = apiControllers;
