const firebase = require('firebase');
const helpers = {};


helpers.isAuthenticated = (req, res, next) => {
    var user = firebase.auth().currentUser;
    if(user !== null)
    {
        req.user = user;
        next();
    } else {
        req.flash('error', 'No autorizado');
        res.render('users/sigin')
    }
};

module.exports = helpers;