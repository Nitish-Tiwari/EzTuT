module.exports = (sequelize, DataTypes) => {
    const StudentExam = sequelize.define("studentExam", {
        marks: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    });
    return StudentExam
}