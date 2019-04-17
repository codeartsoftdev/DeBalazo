const router = require('express').Router();

router.get('/menu', (req,res) => {
    res.render('Menu/AltaMenu');
});

module.exports = router;