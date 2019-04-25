const router = require('express').Router();


router.get('/', (req, res) => {
    const user = req.user;
    res.render('index');
});

module.exports = router;