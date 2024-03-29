const express = require("express")
const fast2sms = require('fast-two-sms')
const router = express.Router()
const { Students } = require('../models');
const { Exam } = require('../models')
const { StudentExam } = require('../models')
const Student = require("../models/Student.js");
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const nodemailer = require('nodemailer')
const crypto = require('crypto');
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
    const password = crypto.randomBytes(4).toString('hex');
    try {
        await Students.create({ ...post, password });
        let mailTransporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "kakarotgoku1529@gmail.com",
                pass: "furtoimuiyfdjimn"
            }
        })
        let details = {
            from: "kakarotgoku1529",
            to: post.email,
            subject: 'New Password',
            text: `
            Thank You for Joining
            Your email is ${post.email}
            Your new password is ${password}.`

        }
        mailTransporter.sendMail(details, (err) => {
            if (err) {
                res.send(err)
            }
            else {
                res.send("successfull")
            }
        })

        res.json(`Student successfully registered ! Password: ${password}`);
    }
    catch (err) {
        res.json(err)
    }


})

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const student = await Students.findOne({ where: { email: email, password: password } });
        if (student) {
            res.json(student);
        } else {
            res.status(401).json("Invalid credentials");
        }
    } catch (err) {
        res.json(err)
    }
});

router.get('/findstudent/:id', async (req, res) => {
    const id = req.params.id;
    const findstudent = await Students.findOne({ where: { id: id } })
    const studentid = req.params.id
    const result = await sequelize.query(`SELECT * FROM eztutdb.transactions WHERE personid = '${studentid}' AND typeofperson = 'student'`,
        { type: sequelize.QueryTypes.SELECT })

    const resultexam = await sequelize.query(`SELECT * FROM eztutdb.studentexams WHERE StudentId = '${studentid}'`,
        { type: sequelize.QueryTypes.SELECT })

    const examId = resultexam.map((e) => {
        return e.examId
    })
    console.log(examId)
    if (examId.length !== 0) {
        const averagemarks = await sequelize.query(`SELECT examId, AVG(marks) AS average_marks FROM eztutdb.studentexams WHERE examId IN (${examId.join(', ')}) GROUP BY examId`, {
            type: Sequelize.QueryTypes.SELECT
        })
        const exams = await Exam.findAll({
            attributes: ['id', 'name'], // Select both the exam ID and examName columns
            where: {
                id: examId // Find exams with the specified IDs
            }
        });

        const resultexamname = exams.map(exam => {
            return { examId: exam.id, exam_name: exam.name };
        });


        console.log(averagemarks, resultexamname)
        res.json({ student: findstudent, transactions: result, examresult: resultexam, averagemakrs: averagemarks, examname: resultexamname })
    }
    else {
        res.json({ student: findstudent, transactions: result })
    }
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
router.get('/exams', async (req, res) => {
    const exams = await Exam.findAll({
        include: [
            {
                model: StudentExam,
                include: [
                    {
                        model: Students,
                        attributes: ['name'], // include the 'name' attribute from the Student model
                    },
                ],
            },
        ],
    });
    res.json(exams);
});
router.post('/exams', async (req, res) => {
    const post = req.body;
    console.log(req.body)

    try {
        console.log(post)
        const exam = await Exam.create(post);

        res.json({ message: "Exam created successfully!", exam });
    } catch (err) {
        console.log(err)
        res.json(err);
    }
});
router.delete('/exams/:id', async (req, res) => {
    try {
        const exam = await Exam.findByPk(req.params.id);
        if (!exam) {
            return res.status(404).json({ message: 'Exam not found' });
        }
        await exam.destroy();
        res.json({ message: 'Exam deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});
router.post('/student-exams', async (req, res) => {
    const { examId, students } = req.body;
    console.log(`Number of students: ${students.length}`);
    try {
        for (const student of students) {
            const { StudentId, marks } = student;
            console.log(`Processing student with ID ${StudentId} and marks ${marks}`);
            try {
                const studentExam = await StudentExam.create({ marks, StudentId });
                const exam = await Exam.findByPk(examId);

                const studentObj = await Students.findByPk(StudentId);

                await exam.addStudentExam(studentExam);

                await studentObj.addStudentExam(studentExam);

            } catch (err) {
                console.error(`Error adding student exam: ${err}`);
            }
        }

        res.json({ message: "Student exams added successfully!" });
    } catch (err) {
        res.json(err);
    }
});

module.exports = router;