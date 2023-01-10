const express = require("express")
const router = express.Router()
const { Teachers } = require('../models');
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
    try {
        const listofTeachers = await Teachers.findAll()
        res.json(listofTeachers)
    } catch (err) {
        res.json(err)
    }
});

router.post("/", async (req, res) => {
    try {
        const post = req.body
        await Teachers.create(post);
        res.json(post);
    } catch (err) {
        res.json(err);
    }
})
router.put('/findteacher/:id', async (req, res) => {
    const id = req.params.id;
    const findteacher = await Teachers.findOne({ where: { id: id } })
    res.json(findteacher)
})

router.get('/teachercount', async (req, res) => {
    const count = await Teachers.count();
    res.json(count)
})
router.get("/totalsalary", async (req, res) => {
    const totalsalary = await Teachers.sum('Salary')
    res.json(totalsalary)
})
router.get("/monthsalary", async (req, res) => {
    const monthsalary = await sequelize.query("SELECT MONTHNAME(createdAt) as Month_Wise,count(monthname(createdAt)) Sales_count,Sum(Salary) Sales_Value from eztutdb.teachers group by MONTHNAME(createdAt)",
        { type: Sequelize.QueryTypes.SELECT })
    res.json(monthsalary)
})
module.exports = router;