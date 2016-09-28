var Sequelize = require('sequelize');

module.exports = function(sequelize) {
    return {
        User: sequelize.define('user', {
            firstName: { type: Sequelize.STRING },
            lastName: { type: Sequelize.STRING },
            aliases: { type: Sequelize.ARRAY(Sequelize.STRING), allowNull: false, defaultValue: new Array() },
            isActive: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true }
        })
    };
}

module.exports.setAssociations = function(models) {
    models.User.hasMany(models.Award, {as: 'awardsOut', foreignKey: 'sourceId'});
    models.User.hasMany(models.Award, {as: 'awardsIn', foreignKey: 'recipientId'});
}
