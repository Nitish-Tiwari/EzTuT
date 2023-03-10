const express = require("express")
const router = express.Router()
const { Teachers, Students, Transactions } = require('../models');
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};
const moment = require('moment');
const { Op } = require("sequelize")
let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}
router.get("/", async (req, res) => {
    let sales = {
        income: 0,
        expense: 0
    };
    Transactions.findAll().then(transactions => {
        transactions.forEach(transaction => {
            if (transaction.typeofamount === 'income') {
                sales.income += transaction.amount;
            } else if (transaction.typeofamount === 'expense') {
                sales.expense += transaction.amount;
            }
        });

        res.json({ "sales": sales });
    }).catch(error => {
        res.json(error);
    });

})
router.get('/tranctiondetail/:dateRange', async (req, res) => {

    const dateRange = req.params.dateRange;

    // get the start and end dates based on the dateRange parameter
    let startDate, endDate;
    const now = moment();
    const startOfToday = moment().startOf('day').format('YYYY-MM-DD HH:mm:ss');
    const endOfToday = moment().endOf('day').format('YYYY-MM-DD HH:mm:ss');
    const yesterday = moment().subtract(1, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss');
    const thisWeekStart = moment().startOf('week').format('YYYY-MM-DD HH:mm:ss');
    const thisWeekEnd = moment().endOf('week').format('YYYY-MM-DD HH:mm:ss');
    const thisMonthStart = moment().startOf('month').format('YYYY-MM-DD HH:mm:ss');
    const thisMonthEnd = moment().endOf('month').format('YYYY-MM-DD HH:mm:ss');
    const thisYearStart = moment().startOf('year').format('YYYY-MM-DD HH:mm:ss');
    const thisYearEnd = moment().endOf('year').format('YYYY-MM-DD HH:mm:ss');
    console.log(startOfToday, yesterday, thisYearStart)

    switch (dateRange) {
        case 'today':
            startDate = startOfToday;
            endDate = endOfToday;
            break;
        case 'yesterday':
            startDate = yesterday;
            endDate = yesterday;
            break;
        case 'thisWeek':
            startDate = thisWeekStart;
            endDate = thisWeekEnd;
            break;
        case 'thisMonth':
            startDate = thisMonthStart;
            endDate = thisMonthEnd;
            break;
        case 'thisYear':
            startDate = thisYearStart;
            endDate = thisYearEnd;
            break;
        default:
            startDate = startOfToday;
            endDate = thisYearStart;
    }


    Transactions.findAll({
        where: {
            createdAt: {
                [Op.between]: [endDate, startDate]
            }
        }
    }).then(transactions => {

        // calculate income and expense totals
        let income = 0;
        let expense = 0;
        transactions.forEach(transaction => {
            if (transaction.typeofamount === 'income') {
                income += transaction.amount;
            } else {
                expense += transaction.amount;
            }
        });
        if (dateRange === 'today' || dateRange === 'yesterday') {
            const breakdown = [];
            const hours = [];
            for (let i = 0; i < 24; i++) {
                hours.push(i < 10 ? `0${i}:00` : `${i}:00`);
                breakdown.push({ hours: hours[i], income: 0, expense: 0 });
            }
            transactions.forEach(transaction => {

                const hour = moment(transaction.createdAt).hour();
                console.log(transaction.createdAt, hour, "hour")
                const index = hours.indexOf(`${hour}:00`);

                if (transaction.typeofamount === 'income') {
                    breakdown[index].income += transaction.amount;
                } else {
                    breakdown[index].expense += transaction.amount;
                }
            });
            res.json(breakdown);
        }
        // if (dateRange === "thisweek" || dateRange === "lastweek") {
        //     const breakdown = [];
        //     const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        //     for (let i = 0; i < 7; i++) {
        //         breakdown.push({ day: days[i], income: 0, expense: 0 });
        //     }
        //     transactions.forEach(transaction => {
        //         const day = new Date(transaction.createdAt).getDay();
        //         breakdown[day].income += transaction.typeofamount === 'income' ? transaction.amount : 0;
        //         breakdown[day].expense += transaction.typeofamount === 'expense' ? transaction.amount : 0;
        //     });
        //     res.json(breakdown);
        // }
        else {
            res.json({ income, expense });
        }
    }).catch(error => {
        console.log(error);
        res.status(500).json({ message: 'Error occurred while fetching transactions' });
    })
})


module.exports = router;