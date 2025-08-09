require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectToDB = require("./db/db");

const authRouter = require("./routes/auth-routes");
const homeProfileRouter = require('./routes/home-profile-routes')

connectToDB();

const port = 5000;//process.env.PORT;
const app = express();

app.use(express.json());
app.use(cors());

app.use('/obi', authRouter);
app.use('/obi', homeProfileRouter);

app.listen(port, () => {
    console.log(`Server is now runing on Port ${port}`)
})