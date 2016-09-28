const Hapi = require('hapi');
const server = new Hapi.Server();
const config = require('./config');

server.connection({ host: config.get('host'), port: config.get('port')});


require('./data')(server, config)
.then(() => require('./auth')(server, config))
.then(() => require('./controllers')(server, config))
.catch((err) => {console.log("Initialization error: " + err); console.log(err)})

server.decorate('server', 'config', config);

server.start((err) => {

    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});
