const express = require("express");

const router = express.Router();


router.get("/", (req, res) => {
    res.render('index',{
        Screen: "Home",
        title: "ONeQuote Api Develoment",
    })
})


module.exports = router;