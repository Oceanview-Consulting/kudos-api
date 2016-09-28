var cliController = require("./cli.controller");

module.exports = function(server) {
	server.route({
        method: ['PUT', 'POST', 'GET'],
        path: '/cli',
        config: {
            handler: cliController.main,
            auth: false
        }
    });
}