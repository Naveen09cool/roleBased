module.exports = function (sequelize, DataTypes) {
    const agentSites = sequelize.define('agentSites', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      agent_id:{
        type: DataTypes.INTEGER
      },
      site_id:{
        type: DataTypes.INTEGER,
      }
    });
  
    agentSites.associate = function (models) {
      agentSites.belongsTo(models.users,{
        foreignKey: 'site_id',
        targetKey: 'user_id',
        as: 'site',
      })

      agentSites.hasMany(models.siteStores,{
        foreignKey: 'store_id',
        sourceKey: 'site_id',
        as: 'store'
      })
    };
  
    return agentSites;
  };