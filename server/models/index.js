'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}


fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});


db.sequelize = sequelize;
db.Sequelize = Sequelize;
const StudentModel = require('./Student.js')(sequelize, Sequelize.DataTypes);
const ExamModel = require('./Exam.js')(sequelize, Sequelize.DataTypes);
const StudentExamModel = require('./StudentExam.js')(sequelize, Sequelize.DataTypes);
db.Student = StudentModel;
db.Exam = ExamModel;
db.StudentExam = StudentExamModel;

// Define associations between models
ExamModel.hasMany(StudentExamModel);
StudentExamModel.belongsTo(ExamModel);

StudentModel.hasMany(StudentExamModel);
StudentExamModel.belongsTo(StudentModel);

module.exports = db;
