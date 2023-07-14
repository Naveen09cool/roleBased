

module.exports = function (sequelize, DataTypes) {
  const siteUsers = sequelize.define('siteUsers', {
    site_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    full_name: {
      type: DataTypes.STRING(40),
      allowNull: false,
      trim: true
    },
    email: {
      type: DataTypes.STRING(40),
      unique: true,
      allowNull: false,
      trim: true
    },
    password_hash: {
      type: DataTypes.STRING(80),
      allowNull: false,
      trim: true
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.NOW
    }
  })

  siteUsers.associate = function (models){

    siteUsers.hasMany(models.storeUsers, {
      foreignKey: 'store_id',
      as: 'storeUser'
    });

    siteUsers.belongsTo(models.agentUsers, {
      foreignKey: 'agent_id',
      as: 'agentUser'
    });
  }
  
  return siteUsers
}
