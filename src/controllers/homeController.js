const router = require('express').Router();

const electronicsManager = require('../managers/electronicsManager')

router.get('/', (req, res) => {
    res.render('home');
})
router.get('/404', (req, res) => {
    res.render('404');
})
router.get('/search', async (req, res) => {
    const {searchName, searchType} = req.query;
    const electronics = await electronicsManager.getAllByQuery(searchName, searchType);

    res.render('search', {electronics, searchName, searchType});
})

module.exports = router;