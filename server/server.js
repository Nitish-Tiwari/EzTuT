const express = require('express')
const app = express();
const cors = require('cors')
app.use(express.json());
app.use(cors());
const db = require('./models')

// Routers 
const studentRouter = require('./routes/Students.js');
const teacherRouter = require("./routes/Teachers.js")
const transactionRouter = require("./routes/Transactions.js")
const dashboardRouter = require("./routes/Dashboard.js")
app.use("/students", studentRouter);
app.use("/teachers", teacherRouter);
app.use("/transactions", transactionRouter);
app.use("/dashboard", dashboardRouter);


db.sequelize.authenticate()
    .then(() => {
        console.log('Database connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

app.listen(3001, () => {
    console.log('Server running on port 3001');
});

