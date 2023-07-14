module.exports = function (sequelize, DataTypes) {
    const users = sequelize.define(
      "users",
      {
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
        is_verified:{
          type:DataTypes.BOOLEAN,
          defaultValue:true,
          allowNull:false
        },
        user_type:{
            type :DataTypes.STRING(50),
            allowNull:false
        },
        is_admin:{
            type:DataTypes.BOOLEAN,
            defaultValue:false,
            allowNull:false
        }
      },
      {
        tableName: "users",
        classMethod: {},
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
      }
    );
  
    return users;
  };