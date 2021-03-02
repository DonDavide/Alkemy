module.exports = (sequelize, DataTypes) => {
    let alias = 'User';
    let cols =  {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        fullname: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        createdAt: {
            type: DataTypes.DATE
        },
        updatedAt: {
            type: DataTypes.DATE
        }
    };
    let config = {
        tableName: 'users',
    }
    const User = sequelize.define(alias, cols, config);
    User.associate = function(models){
        User.hasMany(models.Operation, {
            as: "operations",
            foreignKey: "userId"
        });  
    } 
    return User;
}