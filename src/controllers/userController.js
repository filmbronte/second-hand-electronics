const router = require('express').Router();
const {extractErrorMessages} = require('../utils/errorHelpers');

const userManager = require('../managers/userManager');

router.get('/login', (req, res) => {
    res.render('users/login');
})

router.post('/login', async (req, res) => {
    const {email, password} = req.body;

    try {
        const token = await userManager.login(email, password);

        res.cookie('token', token);

        res.redirect('/');
    } catch (err) {
        const errorMessages = extractErrorMessages(err);
        res.status(404).render('users/login', {errorMessages});
    }
})

router.get('/register', (req, res) => {
    res.render('users/register');
})

router.post('/register', async (req, res) => {
    const {email, username, password, repeatPassword} = req.body;

    try {
        const token = await userManager.register({email, username, password, repeatPassword});

        res.cookie('token', token);

        res.redirect('/');
    } catch (err) {
        const errorMessages = extractErrorMessages(err);

        res.status(404).render('users/register', {errorMessages})
    }
})

router.get('/logout', (req, res) => {
    res.clearCookie('token');

    res.redirect('/');
})

module.exports = router;