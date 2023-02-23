const express = require("express")
const router = express.Router()
const { Teachers, Students, Transactions } = require('../models');
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


module.exports = router;