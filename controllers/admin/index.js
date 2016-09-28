var adminController = require('./admin.controller');

module.exports = function(server, config) {
	server.route({
        method: ['PUT', 'POST', 'GET'],
        path: '/admin',
        config: {
            handler: adminController.main,
            auth: {
            	scope: ['+admin']
            }
        }
    });

    server.route({
    	method: ['*'],
    	path: '/admin/hello',
    	config: {
    		handler: adminController.hello,
    		auth: false
    	}
    });
}