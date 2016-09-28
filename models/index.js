var _ = require('lodash');
var Sequelize = require('sequelize');

var Models = [
    'Award',
    'Client',
    'User'
];

module.exports = function(sequelize, options) {
    options = options || {};

    var modelLoaders = _.map(Models, function(model) {
        return require('./' + model);
    });

    var modelSet = {};

    _.merge.apply(_,_.flatten([modelSet, _.flatMap(modelLoaders, (loader) => loader(sequelize))]));

    // Once we've loaded all the model objects, loop back through and have them set their associations
    _.forEach(modelLoaders, function(loader) {
        loader.setAssociations(modelSet);
    });

    return modelSet;
}
