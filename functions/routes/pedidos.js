const router = require('express').Router();
const db = require('firebase-admin').firestore();
const { isAuthenticated} = require('../helper/Auth');

router.get('/pedidos/proveedores', (req,res) => {
    // var nombre = req.user.displayName;
    // var user = req.user;
    res.render('Pedidos/1ListaProveedores');
});

router.get('/pedidos/listaprov', isAuthenticated, (req,res ) => {
    var nombre = req.user.displayName;
    var user = req.user;
    res.render('Pedidos/2ListaProdProv', {user: user, nombre:nombre});
});

router.get('/pedidos/pagar', isAuthenticated, (req,res ) => {
    var nombre = req.user.displayName;
    var user = req.user;
    res.render('Pedidos/3PagarPedido', {user: user, nombre:nombre});
});



module.exports = router;