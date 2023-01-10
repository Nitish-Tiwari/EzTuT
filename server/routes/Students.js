const express = require("express")
const router = express.Router()
const { Students } = require('../models');
const Student = require("../models/Student.js");
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}


router.get('/', async (req, res) => {
    const listofStudents = await Students.findAll()
    res.json(listofStudents)
});

router.post("/", async (req, res) => {
    const post = req.body
    await Students.create(post);
    res.json(post);
})
router.put('/findstudent/:id', async (req, res) => {
    const id = req.params.id;
    const findstudent = await Students.findOne({ where: { id: id } })
    res.json(findstudent)
})

router.get('/studentcount', async (req, res) => {
    const count = await Students.count();
    res.json(count)
})
router.get("/totalfee", async (req, res) => {
    const totalfee = await Students.sum('Fee')
    res.json(totalfee)
})
router.get("/monthfee", async (req, res) => {
    const monthfee = await sequelize.query("SELECT MONTHNAME(createdAt) as Month_Wise,count(monthname(createdAt)) Sales_count,Sum(Fee) Sales_Value from students group by MONTHNAME(createdAt)",
        { type: Sequelize.QueryTypes.SELECT })
    res.json(monthfee)
})
router.get("/eachclass", async (req, res) => {
    const eachclass = await Students.findAll({
        attributes: ['Class', [Sequelize.fn('COUNT', '*'), 'num_students']],
        group: ['Class']
    })
    res.json(eachclass)
})
module.exports = router;