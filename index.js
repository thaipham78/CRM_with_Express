const express = require("express");
const session = require("express-session");
const sequelize = require("./database.js");
let sequelizeStore = require("connect-session-sequelize")(session.Store);
const dotenv = require("dotenv");
const defaultRoute = require("./routes/index");
const companyRoute = require("./routes/company");
const contactRoute = require("./routes/contact");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const errRoute=require("./routes/error");
const {errorHandler}=require("./middleware/errorHandler")

dotenv.config();
const port = process.env.DEV_PORT;
let store = new sequelizeStore({
  db: sequelize,
});

const app = express();

app.use(
  session({
    secret: "Yeah",
    saveUninitialized: false,
    store: store,
    resave: false,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.set("view engine", "pug");
app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});


app.use("/", defaultRoute);
app.use("/company", companyRoute);
app.use("/contact", contactRoute);
app.use("/user", userRoute);
app.use("/auth", authRoute);
app.use("*",errRoute);
app.use(errorHandler);
