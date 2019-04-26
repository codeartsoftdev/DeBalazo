const router = require('express').Router();
const db = require('firebase-admin').firestore();
const { isAuthenticated} = require('../helper/Auth');

router.get('/menu/a', isAuthenticated, (req,res) => {
    var nombre = req.user.displayName;
    var user = req.user;
    res.render('Menu/AltaMenu', {user: user, nombre:nombre});
});

router.get('/menu/l', isAuthenticated, (req,res ) => {
    var nombre = req.user.displayName;
    var user = req.user;
    res.render('Menu/ListaMenu', {user: user, nombre:nombre});
});


router.post('/menu', isAuthenticated,  (req,res) => {
    var nombre = req.user.displayName;
    var user = req.user;
   //const {Titulo, Precio, Descripcion, AgregarImagen} = req.body;

//    db.collection("Menu").add({
//     Titulo: Titulo,
//     Precio: Precio,
//     Descripcion: Descripcion,
//     Imagen: AgregarImagen
// })
// .then(function(docRef) {
//     var nombre = req.user.displayName;
//     var user = req.user;
//      res.render('Menu/AltaMenu', {user: user, nombre:nombre});


// })
// .catch(function(error) {
//     // console.error("Error adding document: ", error);
//     res.send(error);
// });
    res.render('/menu')

});


module.exports = router;