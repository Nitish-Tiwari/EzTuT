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
router.get('/findteacher/:id', async (req, res) => {
    const id = req.params.id;
    const findteacher = await Teachers.findOne({ where: { id: id } })
    const teacherid = req.params.id
    const result = await sequelize.query(`SELECT * FROM eztutdb.transactions WHERE personid = '${teacherid}' AND typeofperson = 'teacher'`,
        { type: sequelize.QueryTypes.SELECT })
    res.json({ teacher: findteacher, transactions: result })

})

router.delete('/findteacher/:id', async (req, res) => {
    Teachers.destroy({
        where: {
            id: req.params.id,
        },
    })
        .then(() => {
            res.sendStatus(204);
        })
        .catch((error) => {
            res.status(400).send({ error: error.message });
        });
})
router.put('/findteacher/:id', (req, res) => {
    const id = req.params.id;
    const { ...data } = req.body;
    Teachers.update(
        { ...data },
        {
            where: {
                id
            },
        }
    )
        .then((updatedUser) => {
            res.status(200).send({ data: updatedUser });
        })
        .catch((error) => {
            res.status(400).send({ error: error.message, data: { ...req.body } });
        });
});
router.get('/teachercount', async (req, res) => {
    const count = await Teachers.count();
    res.json(count)
})
router.get("/totalsalary", async (req, res) => {
    const totalsalary = await Teachers.sum('Salary')
    res.json(totalsalary)
})
router.get("/monthsalary", async (req, res) => {
    const monthsalary = await sequelize.query("SELECT MONTHNAME(createdAt) as Month_Wise,count(monthname(createdAt)) Sales_count,Sum(salary) Sales_Value from eztutdb.teachers group by MONTHNAME(createdAt)",
        { type: Sequelize.QueryTypes.SELECT })
    res.json(monthsalary)
})
module.exports = router;