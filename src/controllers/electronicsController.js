const router = require('express').Router();

const electronicsManager = require('../managers/electronicsManager');

const {extractErrorMessages} = require("../utils/errorHelpers");

router.get('/', async (req, res) => {
    const electronics = await electronicsManager.getAll();

    res.render('catalog', {electronics})
})

router.get('/create', (req, res) => {
    res.render('catalog/create');
})

router.post('/create', async (req, res) => {
    const data = req.body;

    try {
        await electronicsManager.create({...data, owner: req.user._id});

        res.redirect('/catalog')
    } catch(err) {
        const errorMessages = extractErrorMessages(err);
        res.render('catalog/create', {errorMessages});
    }
})

router.get('/:electronicsId/details', async (req, res) => {
    const electronicsId = req.params.electronicsId;
    const electronics = await electronicsManager.getOne(electronicsId).lean();
    const isOwner = req.user?._id == electronics.owner?._id;

    res.render('catalog/details', {electronics, isOwner})
})

router.get('/:electronicsId/edit', async (req, res) => {
    const electronics = await electronicsManager.getOne(req.params.electronicsId).lean();

    res.render('catalog/edit', {electronics});
})

router.post('/:electronicsId/edit', async (req, res) => {
    try {
        const data = req.body;

        await electronicsManager.edit(req.params.electronicsId, data);

        res.redirect(`/catalog/${req.params.electronicsId}/details`);
    } catch (err) {
        const errorMessages = extractErrorMessages(err);
        res.render('catalog/edit', {errorMessages});
    }
})

router.get('/:electronicsId/delete', async (req, res) => {
    try {
        await electronicsManager.delete(req.params.electronicsId);

        res.redirect('/catalog');
    } catch(err) {
        res.render('catalog/details', {error: err.message});
    }
})

module.exports = router;