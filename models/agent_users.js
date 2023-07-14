
const {siteUsers} = require('./site_users')

module.exports = function (sequelize, DataTypes) {
  const agentUsers = sequelize.define('agentUsers', {
    agent_id: {
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
    // created_by: {
    //   type: DataTypes.
    // },
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

  agentUsers.associate = function (models){
    agentUsers.hasMany(models.siteUsers, {
      foreignKey: 'agent_id',
      as: 'siteUsers'
    });
  }
  

  // User.hasMany(Foto,{as: 'fotos', foreignKey: 'userId'})
  return agentUsers
}
