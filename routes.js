const express = require('express');
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });
const { check, validationResult } = require('express-validator');
const { env } = require('./config')
const db = require('./db/models')

const router = express.Router();

const parkValidators = [
    check('parkName')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for Park Name')
        .isLength({ max: 255 })
        .withMessage('Park Name must not be more than 255 characters long'),
    check('city')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for City')
        .isLength({ max: 100 })
        .withMessage('City must not be more than 100 characters long'),
    check('provinceState')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for Province/State')
        .isLength({ max: 100 })
        .withMessage('Province/State must not be more than 100 characters long'),
    check('country')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for Country')
        .isLength({ max: 100 })
        .withMessage('Country must not be more than 100 characters long'),
    check('opened')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for Opened')
        .isISO8601()
        .withMessage('Please provide a valid date for Opened'),
    check('country')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for Country" if null or empty')
        .isLength({ max: 100 })
        .withMessage('Country must not be more than 100 characters long'),    
    check('size')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for Size')
        .isLength({ max: 100 })
        .withMessage('Size must not be more than 100 characters long'),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for Description')
];

const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next)

router.get('/', (req, res) => {
    res.render('index', {title: 'Home'});
})

router.get('/park/:id(\\d+)', asyncHandler(async (req, res, next) => {
    const parkId = Number(req.params.id)
    const park = await db.Park.findByPk(parkId)
    res.render('park-detail', {title: 'Park Detail', park})
}))

router.get('/parks', asyncHandler(async (req, res) => {
    const parks = await db.Park.findAll({
        order: [
            ['parkName', 'ASC']
        ]
    })
    res.render('park-list', {title: 'Parks', parks})
}))

router.get('/park/add', csrfProtection, (req, res) => {
    const park = db.Park.build()
    res.render('park-add', {title: 'Add Park', park, csrfToken: req.csrfToken(), errors: []})
})

router.post('/park/add', parkValidators, csrfProtection, asyncHandler(async (req, res) => {
    const { 
        parkName, 
        city, 
        provinceState, 
        country, 
        opened,
        size,
        description
    } = req.body

    park = db.Park.build({
        parkName,
        city,
        provinceState,
        country,
        opened,
        size,
        description
    })

    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
        console.log('IFFFF In Park Add POST EDIT !!!!!!!!!!!!!!!!!!!!!!!!!!!!')
        await park.save();
        res.redirect('/');
    } else {
        console.log('ELSE In Park Add POST EDIT !!!!!!!!!!!!!!!!!!!!!!!!!!!!')
        const errors = validatorErrors.array().map((error) => error.msg);
        res.render('park-add', { 
            errors, 
            title: 'Add Park', 
            park, 
            csrfToken: req.csrfToken(),
        });
    }
}))

if (env !== "production") {
    router.get("/error-test", () => {
        throw new Error("This is a test error.");
    });
}

module.exports = router