module.exports = (sequelize, DataTypes) => {
    const Students = sequelize.define("Students", {
        Name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Age: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        Gender: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Class: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        Address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Fee: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });
    return Students
}