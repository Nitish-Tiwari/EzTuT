module.exports = (sequelize, DataTypes) => {
    const Transactions = sequelize.define("Transactions", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phonenumber: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        typeofperson: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        personid: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        batchname: {
            type: DataTypes.STRING,

        },
        amounttype: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        typeofamount: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });
    return Transactions
}