module.exports = (sequelize, DataTypes) => {

    const Product = sequelize.define("product", {
        type: {
            type: DataTypes.STRING
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER
        },
        date: {
            type: DataTypes.DATE
        },
        date_add: {
            type: DataTypes.DATE
        },
        date_update: {
            type: DataTypes.DATE
        }
    
    })

    return Product

}