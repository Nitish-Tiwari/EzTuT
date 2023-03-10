module.exports = (sequelize, DataTypes) => {
    const Exam = sequelize.define("exam", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdBy: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return Exam
}