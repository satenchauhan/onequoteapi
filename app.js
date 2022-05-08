require("dotenv").config();
const express = require('express');
const app = express();
const path = require("path");
const indexRouter = require("./src/index");
const userRouter = require("./src/users/user.router");
const clientRouter = require("./src/clients/client.router");
const contactRouter = require("./src/contacts/contact.router");
const propertyRouter = require("./src/properties/property.router");

console.log(path.join(__dirname,"./src/views"));

// app.set("views",path.join(__dirname,"views"))
app.set("views",path.join(__dirname,"./src/views"))

app.set("view engine", "ejs");

app.use(express.json());

app.use(express.urlencoded({ extended: true} ));

// app.use(express.static("public"));
/* Require static assets from public folder */
// app.use(express.static("./src/public"));
app.use(express.static(path.join(__dirname, './src/public')));

app.use("/",indexRouter);

/* API URL ROUTER */
app.use("/users", userRouter);
app.use("/clients", clientRouter);
app.use("/contacts", contactRouter);
app.use("/properties", propertyRouter);



app.listen(process.env.APP_PORT, () =>{
     console.log("Server is running on port " + process.env.APP_PORT)
});
