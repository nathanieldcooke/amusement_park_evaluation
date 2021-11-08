const express = require('express');
const { env } = require('./config')

const router = express.Router();

router.get('/', async (req, res) => {
    res.render('index', {title: 'Home'});
})

if (env !== "production") {
    router.get("/error-test", () => {
        throw new Error("This is a test error.");
    });
}

module.exports = router