const express = require("express")
const fast2sms = require('fast-two-sms')
const router = express.Router()
const { Students } = require('../models');
const Student = require("../models/Student.js");
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const nodemailer = require('nodemailer')

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
    try {
        await Students.create(post);
        res.json(post);
    }
    catch (err) {
        res.json(err)
    }


})
router.get('/findstudent/:id', async (req, res) => {
    const id = req.params.id;
    const findstudent = await Students.findOne({ where: { id: id } })
    res.json(findstudent)
})
router.post('/reminder', async (req, res) => {
    const body = req.body
    let mailTransporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "kakarotgoku1529@gmail.com",
            pass: "furtoimuiyfdjimn"
        }
    })
    let details = {
        from: "kakarotgoku1529",
        to: body.to,
        subject: "Please Clear the Remaining Due Fee",
        text: `${body.message} 
        Total Fee: ${body.totalfee}
        Total Paid Fee: ${body.totalpaidfee}`

    }
    mailTransporter.sendMail(details, (err) => {
        if (err) {
            res.send(err)
        }
        else {
            res.send("successfull")
        }
    })




})
router.delete('/findstudent/:id', async (req, res) => {
    Students.destroy({
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
router.put('/findstudent/:id', (req, res) => {
    const id = req.params.id;
    const { ...data } = req.body;
    Students.update(
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
router.get('/studentcount', async (req, res) => {
    const count = await Students.count();
    res.json(count)
})
router.get("/totalfee", async (req, res) => {
    const totalfee = await Students.sum('Fee')
    res.json(totalfee)
})
router.get("/monthfee", async (req, res) => {
    const monthfee = await sequelize.query("SELECT MONTHNAME(createdAt) as Month_Wise,count(monthname(createdAt)) Sales_count,Sum(fee) Sales_Value from students group by MONTHNAME(createdAt)",
        { type: Sequelize.QueryTypes.SELECT })
    res.json(monthfee)
})
router.get("/eachclass", async (req, res) => {
    const eachclass = await Students.findAll({
        attributes: ['class', [Sequelize.fn('COUNT', '*'), 'num_students']],
        group: ['class']
    })
    res.json(eachclass)
})
router.get("/getbatchname", async (req, res) => {
    const arrbatch = await sequelize.query(
        'SELECT DISTINCT batchname FROM students',
        { type: sequelize.QueryTypes.SELECT }
    )
    let finalResult = []
    let studentResult = []
    await Promise.all(arrbatch.map(async (obj) => {
        studentResult = await Students.findAll({
            where: {
                batchname: obj['batchname']
            }
        })
        finalResult.push({
            batchname: obj['batchname'],
            students: studentResult
        })
    }))
    console.log(finalResult)
    res.json(finalResult)
})
router.get("/getbybatchname/:batchname", async (req, res) => {
    const batchname = req.params.batchname

    res.json(batchname)
})
module.exports = router;