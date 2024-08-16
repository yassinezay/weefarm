module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        fullname: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 'No Name'
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true
        },
        role: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        resetPasswordToken: {
            type: DataTypes.STRING,
            allowNull: true
        },
        resetPasswordExpires: {
            type: DataTypes.DATE,
            allowNull: true
        },
        companyName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        companyFunctionality: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    });

    return User;
};
