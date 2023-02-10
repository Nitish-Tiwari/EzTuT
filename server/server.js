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
app.use("/students", studentRouter);
app.use("/teachers", teacherRouter);
app.use("/transactions", transactionRouter);


db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("Server Running on port 3001");
    });
});

