module.exports = (sequelize, DataTypes) => {
    const Teachers = sequelize.define("Teachers", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        phonenumber: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        subjects: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        paidsalary: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        salary: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });
    return Teachers
}