const express = require('express');
const morgan = require('morgan');
const { env } = require('./config')
const routes = require('./routes');
const app = express()
 
app.set('view engine', 'pug')

app.use(morgan('dev'))

app.use(routes)

// handle uncaught requests and create error object
app.use((req, res, next) => {
    const error = new Error('The requests page couldn\'t be found.');
    error.status = 404;
    next(error);
})

// log errors
app.use((err, req, res, next) => {
    if (env === 'development') {
        console.error(err)
    }
    next(err)
})

// Page Not Found
app.use((err, req, res, next) => {
    if (err.status === 404) {
        res.status(404).render('page-not-found', {title: 'Page Not Found'})
    } else {
        next(err)
    }
})

// Server Error
app.use((err, req, res, next) => {
    res.status(err.status ? err.status : 500)
    console.log('does it hit here?')
    res.render('error.pug', {
        title: 'Server Error', 
        message: env === 'production' ? null : err.message, 
        stack: env === 'production' ? null : err.stack
    })
})




module.exports = app