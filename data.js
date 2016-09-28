'use strict';

const Sequelize = require('sequelize');
const models = require('./models');

module.exports = function(server, config) {
    console.log("Registering data layer...");
    return new Promise((resolve, reject) => {
        var sequelize = new Sequelize(config.get('connectionString'), { dialect: 'postgres', protocol: 'postgres' });

        var generationOptions = {
            initialize: config.initData,
        }
        var generatedModels = models(sequelize);

        server.decorate('server', 'db', sequelize);
        server.decorate('server', 'models', generatedModels);

        if(config.get('initData')) {
            sequelize.sync({force: true})
            .then(function() {
                return seedData(generatedModels);
            }).then(resolve);
        }
        else {
            resolve();
        }
    })

}

function seedData(models) {
    return Promise.all([
        models.User.create({
            firstName: 'Travis',
            lastName: 'Stokes',
            aliases: ['@tstokes'],
            isActive: true
        }),
        models.Client.create({
            name: 'Personal Slack',
            token: 'Stokes',
            scopes: ['cli'],
            isActive: true
        })
    ]);
}
