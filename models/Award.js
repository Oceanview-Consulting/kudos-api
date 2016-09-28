var Sequelize = require('sequelize');

module.exports = function(sequelize) {
    return {
        Award: sequelize.define('award', {
            value: { type: Sequelize.INTEGER, allowNull: false },
            dateAwarded: { type: Sequelize.DATEONLY, allowNull: false, defaultValue: Sequelize.NOW },
            reason: { type: Sequelize.STRING, allowNull: false, defaultValue: 'No reason provided' }
        })
    };
}

module.exports.setAssociations = function(models) {
    models.Award.belongsTo(models.User, {as: 'recipient', foreignKey: 'recipientId'});
    models.Award.belongsTo(models.User, {as: 'source', foreignKey: 'sourceId'});
}
