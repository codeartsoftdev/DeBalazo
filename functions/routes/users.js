const router = require('express').Router();
const firebase = require('firebase');
const admin = require('firebase-admin');
const { isAuthenticated} = require('../helper/Auth');
const passport = require('passport');
const db = require('firebase-admin').firestore();


router.get('/users/sigin', (req, res) => {
    res.render('users/sigin');
});

router.post('/users/sigin', passport.authenticate('local', {
  successRedirect: '/Menu/a',
  failureRedirect: '/users/sigin',
  failureFlash: true
}));

router.get('/users/sigup',  (req, res) => {
  var giro = [];
  var datos = {};

  db.collection('giro').get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          //console.log(doc.id, '=>', doc.data());
          datos = {
            key: doc.id,
            value: doc.data().giro
          }
            giro.push(datos);
        });
        res.render('users/sigup', {giro:giro});
      })
      .catch(err => {
        res.send(err);
      });
});

router.get('/users/buscarColonias/:cp', (req,res) => {
 var cp = req.params.cp;
 
 var cityRef = db.collection('colonias').doc(cp);
 var getDoc = cityRef.get()
   .then(doc => {
     if (!doc.exists) {
      res.send("No se encontro nada");
       console.log('No such document!');
     } else {
       var colonias = doc.data();
      res.json( colonias); 
       console.log('Document data:', doc.data());
     }
   })
   .catch(err => {
    res.send(err);
     console.log('Error getting document', err);
     
   });
});

router.post('/users/sigup', async(req, res) => {
    const {nombre, apPaterno, apMaterno, email, password, confirmPassword, telefono} = req.body;


    if(password != confirmPassword){
        req.flash('error', 'Las constraseñas no coinciden' + apMaterno + apPaterno); 
    } else {
        await admin.auth().createUser({
            email: email,
            emailVerified: false,
            phoneNumber: telefono,
            password: password,
            displayName: nombre,
            disabled: false
          })
            .then(function(userRecord) {
              // See the UserRecord reference doc for the contents of userRecord.
              res.send(userRecord);
            })
            .catch(function(error) {
              res.render('users/sigup', {error: 'Erro al registrarte'});
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