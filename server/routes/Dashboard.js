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

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const yesterdayStart = new Date();
    yesterdayStart.setDate(yesterdayStart.getDate() - 1);
    yesterdayStart.setHours(0, 0, 0, 0);
    const yesterdayEnd = new Date();
    yesterdayEnd.setDate(yesterdayEnd.getDate() - 1);
    yesterdayEnd.setHours(23, 59, 59, 999);

    const today = new Date();
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
    startOfWeek.setHours(0, 0, 0, 0);
    const endOfWeek = new Date(startOfWeek.getTime() + (6 * 24 * 60 * 60 * 1000));
    endOfWeek.setHours(23, 59, 59, 999);

    const startOfLastWeek = new Date(today.setDate(today.getDate() - today.getDay() - 7)); // change here
    startOfWeek.setHours(0, 0, 0, 0);
    const endOfLastWeek = new Date(startOfLastWeek.getTime() + (6 * 24 * 60 * 60 * 1000));
    endOfWeek.setHours(23, 59, 59, 999);

    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1); // Set start date to 1st day of current month
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0); // Set end date to last day of current month
    endOfMonth.setHours(23, 59, 59, 999);

    const startOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1); // Set start date to 1st day of last month
    const endOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0); // Set end date to last day of last month
    endOfMonth.setHours(23, 59, 59, 999);

    const startOfYear = new Date(today.getFullYear(), 0, 1); // Start of the year
    const endOfYear = new Date(today.getFullYear(), 11, 31); // End of the year
    endOfMonth.setHours(23, 59, 59, 999);

    let startDate, endDate;

    console.log(dateRange)
    switch (dateRange) {
        case 'today':
            startDate = todayStart;
            endDate = todayEnd;
            break;
        case 'yesterday':
            startDate = yesterdayStart;
            endDate = yesterdayEnd;
            break;
        case 'thisweek':
            startDate = startOfWeek;
            endDate = endOfWeek;
            break;
        case 'lastweek':
            startDate = startOfLastWeek
            endDate = endOfLastWeek
            break;
        case 'thismonth':
            startDate = startOfMonth
            endDate = endOfMonth
            break;

        case 'lastmonth':
            startDate = startOfLastMonth
            endDate = endOfLastMonth
            break;
        case 'thisyear':
            startDate = startOfYear
            endDate = endOfYear

    }
    console.log(startDate, endDate)
    try {
        const transactions = await Transactions.findAll({
            where: {
                createdAt: {
                    [Op.between]: [startDate, endDate]
                }
            }
        });
        if (dateRange === 'today' || dateRange === 'yesterday') {
            const hourlyTransactions = [];

            for (let i = 0; i < 24; i++) {
                let start, end;
                if (dateRange === 'today') {
                    start = new Date(todayStart.getTime() + i * 60 * 60 * 1000);
                    end = new Date(todayStart.getTime() + (i + 1) * 60 * 60 * 1000 - 1);
                }
                if (dateRange === 'yesterday') {
                    start = new Date(yesterdayStart.getTime() + i * 60 * 60 * 1000);
                    end = new Date(yesterdayStart.getTime() + (i + 1) * 60 * 60 * 1000 - 1);
                }
                const hourTransactions = {
                    date: `${i.toString().padStart(2, '0')}:00`,
                    income: 0,
                    expense: 0
                };

                for (const transaction of transactions) {

                    if (transaction.createdAt >= start && transaction.createdAt <= end) {

                        if (transaction.typeofamount === 'income') {

                            hourTransactions.income += transaction.amount;
                        } else {

                            hourTransactions.expense += transaction.amount;
                        }
                    }
                }

                hourlyTransactions.push(hourTransactions);
            }

            res.json(hourlyTransactions);
        }
        if (dateRange === 'thisweek' || dateRange === "lastweek") {
            const dailyTransactions = [];
            const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

            for (let i = 0; i < 7; i++) {
                let start, end;
                if (dateRange === 'thisweek') {
                    start = new Date(startOfWeek.getTime() + (i * 24 * 60 * 60 * 1000));
                    end = new Date(startOfWeek.getTime() + ((i + 1) * 24 * 60 * 60 * 1000 - 1));
                }
                if (dateRange === 'lastweek') {
                    start = new Date(startOfLastWeek.getTime() + (i * 24 * 60 * 60 * 1000));
                    end = new Date(startOfLastWeek.getTime() + ((i + 1) * 24 * 60 * 60 * 1000 - 1));
                }

                const dayTransactions = {
                    date: daysOfWeek[i],
                    income: 0,
                    expense: 0
                };

                for (const transaction of transactions) {
                    if (transaction.createdAt >= start && transaction.createdAt <= end) {
                        if (transaction.typeofamount === 'income') {
                            dayTransactions.income += transaction.amount;
                        } else {
                            dayTransactions.expense += transaction.amount;
                        }
                    }
                }

                dailyTransactions.push(dayTransactions);
            }

            res.json(dailyTransactions);
        }
        if (dateRange === 'thismonth') {
            const dailyTransactions = [];
            const daysOfMonth = [];
            const totalDays = endOfLastMonth.getDate();

            for (let i = 1; i <= totalDays; i++) {
                daysOfMonth.push(new Date(today.getFullYear(), today.getMonth(), i));
            }

            for (let i = 0; i < totalDays; i++) {
                const start = daysOfMonth[i];
                const end = new Date(start.getTime() + (24 * 60 * 60 * 1000 - 1));

                const dayTransactions = {
                    date: daysOfMonth[i].toLocaleString('default', { month: 'short', day: 'numeric' }),
                    income: 0,
                    expense: 0
                };

                for (const transaction of transactions) {
                    if (transaction.createdAt >= start && transaction.createdAt <= end) {
                        if (transaction.typeofamount === 'income') {
                            dayTransactions.income += transaction.amount;
                        } else {
                            dayTransactions.expense += transaction.amount;
                        }
                    }
                }

                dailyTransactions.push(dayTransactions);
            }

            res.json(dailyTransactions);
        }
        if (dateRange === 'lastmonth') {
            const dailyTransactions = [];
            const daysOfMonth = [];
            const totalDays = endOfMonth.getDate();

            for (let i = 1; i <= totalDays; i++) {
                daysOfMonth.push(new Date(today.getFullYear(), today.getMonth() - 1, i));
            }

            for (let i = 0; i < totalDays; i++) {
                const start = daysOfMonth[i];
                const end = new Date(start.getTime() + (24 * 60 * 60 * 1000 - 1));

                const dayTransactions = {
                    date: daysOfMonth[i].toLocaleString('default', { month: 'short', day: 'numeric' }),
                    income: 0,
                    expense: 0
                };

                for (const transaction of transactions) {
                    if (transaction.createdAt >= start && transaction.createdAt <= end) {
                        if (transaction.typeofamount === 'income') {
                            dayTransactions.income += transaction.amount;
                        } else {
                            dayTransactions.expense += transaction.amount;
                        }
                    }
                }

                dailyTransactions.push(dayTransactions);
            }

            res.json(dailyTransactions);
        }
        if (dateRange === 'thisyear') {
            const monthlyTransactions = [];
            const monthsOfYear = [];

            for (let i = 0; i < 12; i++) {
                monthsOfYear.push(new Date(today.getFullYear(), i, 1));
            }

            for (let i = 0; i < 12; i++) {
                const start = monthsOfYear[i];
                const end = new Date(today.getFullYear(), i + 1, 0);
                end.setHours(23, 59, 59, 999);

                const monthTransactions = {
                    date: start.toLocaleString('default', { month: 'long' }),
                    income: 0,
                    expense: 0
                };

                for (const transaction of transactions) {
                    if (transaction.createdAt >= start && transaction.createdAt <= end) {
                        if (transaction.typeofamount === 'income') {
                            monthTransactions.income += transaction.amount;
                        } else {
                            monthTransactions.expense += transaction.amount;
                        }
                    }
                }

                monthlyTransactions.push(monthTransactions);
            }

            res.json(monthlyTransactions);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send('Error retrieving transactions for today');
    }
});


module.exports = router;