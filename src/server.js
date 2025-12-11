require("dotenv").config("../.env");
require("./connections/mongo.conn")();


const userRoutes = require("./routes/user.route");
const borrowRoutes = require("./routes/borowing.route");
const bookRoutes = require("./routes/book.route");
const dashboardRoutes = require("./routes/dashboard.route")

const { appPort } = require("./config")
const express = require("express");
const cors = require("cors")

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use("/api/v1/user", userRoutes());
app.use("/api/v1/record", borrowRoutes());
app.use("/api/v1/book", bookRoutes());
app.use("/api/v1/dashboard", dashboardRoutes());


app.listen(4000, () => {
    console.log("App listening on port " + appPort);
})