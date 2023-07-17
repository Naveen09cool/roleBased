module.exports = function (sequelize, DataTypes) {
    const userTypes = sequelize.define('userTypes', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        type_name: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
        }
    });
    return userTypes;
  };