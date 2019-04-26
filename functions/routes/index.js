const router = require('express').Router();
const {isAuthenticated} = require('../helper/Auth');


router.get('/', (req, res) => {
    res.render('index');
});

router.get('/index', isAuthenticated, (req, res) => {
    var nombre = req.user.displayName;
    var user = req.user;
    res.render('index', {user: user, nombre:nombre});
});

module.exports = router;