// models/product.js
module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define("Product", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        technicalDescription: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        productCategory: {
            type: DataTypes.STRING,
            allowNull: true
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        popularity: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        productStatus: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "available" // Example default value
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true
        },
        visibility: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        createdBy: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users', // Assumes Users model exists
                key: 'id'
            }
        }
    });

    return Product;
};
