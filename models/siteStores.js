module.exports = function (sequelize, DataTypes) {
    const siteStores = sequelize.define('siteStores', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      agent_id:{
        type: DataTypes.INTEGER,
      },
      site_id:{
        type: DataTypes.INTEGER
      },
      store_id:{
        type: DataTypes.INTEGER
      }
    });
  
    siteStores.associate = function (models) {
      siteStores.belongsTo(models.agentSites,{
        foreignKey: 'store_id',
        targetKey: 'site_id',
        as: 'store',
      })
    };
  
    return siteStores;
  };


  // siteStores.hasMany(models.users,{
  //     foreignKey: 'store_id',
  //     as: 'store',
  //   })
