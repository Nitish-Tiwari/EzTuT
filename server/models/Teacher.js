module.exports = (sequelize, DataTypes) => {
    const Teachers = sequelize.define("Teachers", {
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
        Subjects: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Salary: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });
    return Teachers
}