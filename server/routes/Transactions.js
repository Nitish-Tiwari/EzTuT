const express = require("express")
const router = express.Router()
const { Transactions } = require('../models');
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
        const listofTransaction = await Transactions.findAll()
        res.json(listofTransaction)
    } catch (err) {
        res.json(err)
    }
});
router.post("/", async (req, res) => {
    const post = req.body
    try {

        await Transactions.create(post);
        res.json(post);
    } catch (err) {
        res.json(err);
    }
})
router.delete('/findtransaction/:id', async (req, res) => {
    Transactions.destroy({
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

module.exports = router;
