const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const clientRoutes = require("./routes/clientRoutes");
const adminRoutes = require("./routes/adminRoutes");
const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

mongoose.set('strictQuery', false);
mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("DB Connetion Successfull");
    })
    .catch((err) => {
        console.log(err.message);
    });

app.use("/admin", adminRoutes);
app.use("/", clientRoutes);

const server = app.listen(process.env.PORT, () =>
    console.log(`Server started on port ${process.env.PORT}`)
);