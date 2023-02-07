module.exports = (sequelize, DataTypes) => {
    const Students = sequelize.define("Students", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        class: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        batchname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phonenumber: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        fee: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });
    return Students
}