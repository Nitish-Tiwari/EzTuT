module.exports = (sequelize, DataTypes) => {
    const Transaction = sequelize.define("Transaction", {
        Name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Class: {
            type: DataTypes.INTEGER,

        },
        AmountType: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        TypeOfAmount: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });
    return Transaction
}