var Sequelize = require('sequelize');

module.exports = function(sequelize) {
    return {
        Client: sequelize.define('client', {
            name: { type: Sequelize.STRING, allowNull: false},
            token: { type: Sequelize.STRING, allowNull: false},
            isActive: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
            scopes: { type: Sequelize.ARRAY(Sequelize.STRING), allowNull: false, defaultValue: []}
        })
    };
}

module.exports.setAssociations = function(models) {

}
