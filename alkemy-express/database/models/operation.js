module.exports = (sequelize, DataTypes) => {
    let alias = 'Operation';
    let cols =  {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userId: {
            type: DataTypes.INTEGER,
        },
        categoryId: {
            type: DataTypes.INTEGER
        },
        concept: {
            type: DataTypes.STRING
        },
        date: {
            type: DataTypes.DATE
        },
        amount: {
            type: DataTypes.INTEGER
        },
        type: {
            type: DataTypes.STRING
        }
    };
    let config = {
        tableName: 'operations',
        }
    const Operation = sequelize.define(alias, cols, config);
    Operation.associate = function(models){
        Operation.belongsTo(models.User, {
            as: "user",
            foreignKey: "userId"
        });
        Operation.belongsTo(models.Category, {
            as: "category",
            foreignKey: "categoryId"
        });    
    } 
    return Operation;
}