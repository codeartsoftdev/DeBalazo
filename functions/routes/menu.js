const router = require('express').Router();
const db = require('firebase-admin').firestore();

router.get('/menu', (req,res) => {
    res.render('Menu/AltaMenu');
});


router.post('/menu', (req,res) => {
   const {Titulo, Precio, Descripcion, AgregarImagen} = req.body;

   db.collection("Menu").add({
    Titulo: Titulo,
    Precio: Precio,
    Descripcion: Descripcion,
    Imagen: AgregarImagen
})
.then(function(docRef) {
    // res.send(docRef);
    var msg = {success: true, title: Titulo};
    // $("#Msg").val('ok');
     res.render('Menu/AltaMenu', {msg});


})
.catch(function(error) {
    // console.error("Error adding document: ", error);
    res.send(error);
});


});


module.exports = router;