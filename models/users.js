module.exports = function (sequelize, DataTypes) {
  const users = sequelize.define('users', {
    user_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    full_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(200),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    is_verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
    is_admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    user_type: {
      type: DataTypes.ENUM('agentUser', 'siteUser', 'storeUser', 'adminUser'),
      defaultValue: 'agentUser'
    },
    createdBy: {
      type: DataTypes.INTEGER,
    },
    updatedBy: {
      type: DataTypes.INTEGER,
    }
  });

  users.associate = function (models) {
    users.hasMany(models.agentSites, {
      foreignKey:'agent_id',
      sourceKey:'user_id',
      as: 'agent',
    });
  };
  return users
};

// users.hasMany(models.siteStores, {
    //   foreignKey:'user_id',
    //   targetKey:'_id',
    //   as: 'siteStore',
    // })