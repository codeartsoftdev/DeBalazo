const router = require('express').Router();
const firebase = require('firebase');
const admin = require('firebase-admin');
const passport = require('passport');

router.get('/users/sigin', (req, res) => {
    res.render('users/sigin');
});

router.post('/users/sigin', passport.authenticate('local', {
    successRedirect: '/Menu/AltaMenu',
    failureRedirect: '/users/sigin',
    failureFlash: true
}));

router.get('/users/sigup', (req, res) => {
    res.render('users/sigup');
});

router.post('/users/sigup', (req, res) => {
    const {nombre, apPaterno, apMaterno, email, password, confirmPassword} = req.body;
    if(password != confirmPassword){
        req.flash('error_message', 'Las constraseñas no coinciden' + apMaterno + apPaterno); 
    } else {
        admin.auth().createUser({
            email: email,
            emailVerified: false,
            phoneNumber: "+11234567890",
            password: password,
            displayName: nombre,
            disabled: false
          })
            .then(function(userRecord) {
              // See the UserRecord reference doc for the contents of userRecord.
              res.send(userRecord);
            })
            .catch(function(error) {
              res.send(error);
            });
    }
});








router.get('/salir', (req, res) => {
    firebase.auth().signOut().then(function() {
        res.redirect('/');
      }).catch(function(error) {
        res.send(error)
      });
});




module.exports = router;