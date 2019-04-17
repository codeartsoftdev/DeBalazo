const router = require('express').Router();
const firebase = require('firebase').auth();

router.get('/users/sigin', (req, res) => {
    res.render('users/sigin');
});

router.post('/users/sigin', (req, res) => {
    const {email, password} = req.body;
    firebase.signInWithEmailAndPassword(email, password).then(function(user){
        res.send(user);
    }).catch(function(fail){
        console.log(fail);
        req.flash('error_message', 'Paso algo');
        res.render('users/sigin');
    });
});


router.get('/salir', (req, res) => {
    firebase.signOut().then(function() {
        res.redirect('/');
      }).catch(function(error) {
        res.send(error)
      });
});




module.exports = router;