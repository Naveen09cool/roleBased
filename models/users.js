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
    createdBy: {
      type: DataTypes.INTEGER,
    },
    parent: {
      type: DataTypes.INTEGER
    }
  });

  users.associate = function (models) {
    users.belongsTo(models.userTypes, {
      foreignKey: 'user_type_id',
      as: 'user_type',
    });
  };

  return users;
};