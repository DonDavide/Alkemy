module.exports = (sequelize, DataTypes) => {
    let alias = 'Category';
    let cols =  {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        category: {
            type: DataTypes.STRING,
        },
    };
    let config = {
        tableName: 'categories',
        timestamps: false
    }
    const Category = sequelize.define(alias, cols, config);
    Category.associate = function(models){
        Category.hasMany(models.Operation, {
            as: "operations",
            foreignKey: "categoryId"
        });  
    } 
    return Category;
}