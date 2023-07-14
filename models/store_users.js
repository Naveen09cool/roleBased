

module.exports = function (sequelize, DataTypes) {
  const storeUsers = sequelize.define('storeUsers', {
    store_id: {
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

  storeUsers.associate = function (models){
    storeUsers.belongsTo(models.siteUsers, {
        foreignKey: 'site_id',
        as: 'siteUser'
      });
  }  
  return storeUsers
}
